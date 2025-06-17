import { useRef, useEffect, useState, useCallback } from 'react'
import { SearchForm } from '../SearchForm/SearchForm'
import { GameControls } from '../GameControls/GameControls'
import { PokemonList } from '../PokemonList/PokemonList'
import { ConfirmDialog } from '../Dialog/ConfirmDialog'
import { TimeTrialOptions } from '../TimeTrialOptions/TimeTrialOptions'
import { SharedChallengeAccept } from '../SharedChallengeAccept/SharedChallengeAccept'
import { TimeTrialCountdown } from '../TimeTrialCountdown/TimeTrialCountdown'
import { TimeTrialResults } from './TimeTrialResults'
import PokemonConfetti from '../../PokemonConfetti'
import { useGameState } from '../../hooks/useGameState'
import { useTimeTrialTimer, formatTime, getCatchBonusTime, getInitialTimeForDifficulty } from '../../hooks/useTimeTrialTimer'
import { getFilteredTitle } from '../../utils/pokemonUtils'
import { submitPokemonGuess, revealRemainingPokemon } from '../../utils/pokemonStateUtils'
import { decodeTimeTrialChallenge, hasSharedChallenge, clearChallengeFromUrl } from '../../utils/timeTrialUtils'
import filterCombinations from '../../data/filterCombinations.json'
import { GENERATIONS } from '../../constants'
import titleImageFull from '../../assets/PokemonCatcherTitleFull.png'
import type { PokemonCountCategory, TimeTrialDifficulty, TimeTrialShareParams } from '../../types'
import './TimeTrialMode.css'

interface DialogConfig {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

interface TimeTrialModeProps {
  onBackToModeSelection: () => void;
}

export const TimeTrialMode = ({ onBackToModeSelection }: TimeTrialModeProps) => {
  const gameState = useGameState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSidebarCollapsed] = useState(true);
  const [_isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true); // Start with options open
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeTrialActive, setTimeTrialActive] = useState(false);
  const [sharedChallenge, setSharedChallenge] = useState<TimeTrialShareParams | null>(null);
  const [timeTrialSettings, setTimeTrialSettings] = useState<{
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
    isDevMode?: boolean;
    customInitialTime?: number;
    customTimePerCatch?: number;
  } | null>(null);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bonusTimeNotifications, setBonusTimeNotifications] = useState<{id: number; amount: number; x: number; y: number}[]>([]);
  
  // Initialize timer with the selected difficulty and custom settings if in dev mode
  const { 
    timeRemaining, 
    elapsedTime,
    isRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    addTime 
  } = useTimeTrialTimer(
    timeTrialSettings?.difficulty || 'medium',
    {
      initialTime: timeTrialSettings?.isDevMode ? timeTrialSettings.customInitialTime : undefined,
      timePerCatch: timeTrialSettings?.isDevMode ? timeTrialSettings.customTimePerCatch : undefined
    }
  );

  // Handle time up - end the game
  const handleTimeUp = useCallback(() => {
    setGameEnded(true);
    pauseTimer();
    setShowResults(true);
  }, [pauseTimer]);

  // Detect when time runs out and end the game
  useEffect(() => {
    if (timeTrialActive && timeRemaining === 0 && !gameEnded) {
      handleTimeUp();
    }
  }, [timeRemaining, timeTrialActive, gameEnded, handleTimeUp]);
  
  // Handle try again button in results
  const handleTryAgain = useCallback(() => {
    // Reset game state with the same settings
    gameState.resetProgress();
    
    // Reset the timer to the correct initial time based on settings
    if (timeTrialSettings) {
      let initialTime;
      if (timeTrialSettings.isDevMode && timeTrialSettings.customInitialTime) {
        initialTime = timeTrialSettings.customInitialTime;
      } else {
        initialTime = getInitialTimeForDifficulty(timeTrialSettings.difficulty);
      }
      resetTimer(initialTime);
    }
    
    setGameEnded(false);
    setShowResults(false);
    
    // Start a new countdown
    setShowCountdown(true);
  }, [gameState, resetTimer, timeTrialSettings]);
  
  // Handle change settings button in results
  const handleChangeSettings = useCallback(() => {
    // Reset game and show options
    gameState.resetProgress();
    
    // Reset the timer
    resetTimer();
    
    setGameEnded(false);
    setShowResults(false);
    setTimeTrialActive(false);
    
    // Clear shared challenge so we show regular settings instead of challenge accept
    setSharedChallenge(null);
    
    setIsOptionsOpen(true);
  }, [gameState, resetTimer]);

  // Track caught Pokemon and add bonus time when a new one is caught
  const previousCaughtCount = useRef(0);
  useEffect(() => {
    if (!timeTrialActive || !timeTrialSettings) return;
    
    const currentCount = gameState.caughtPokemon.length;
    
    // Check if a new Pokemon was caught
    if (currentCount > previousCaughtCount.current && isRunning) {
      // Add bonus time based on settings
      let bonusTime;
      if (timeTrialSettings.isDevMode && timeTrialSettings.customTimePerCatch !== undefined) {
        bonusTime = timeTrialSettings.customTimePerCatch;
      } else {
        bonusTime = getCatchBonusTime(timeTrialSettings.difficulty);
      }
      addTime(bonusTime);
      
      // Show bonus time notification
      const lastCaughtPokemon = gameState.caughtPokemon[currentCount - 1];
      if (lastCaughtPokemon) {
        // Create a notification near the input field
        const inputElement = inputRef.current;
        if (inputElement) {
          const rect = inputElement.getBoundingClientRect();
          
          // Calculate a position that stays within the screen boundaries
          // Use the center of the input field as the base position
          const centerX = rect.left + rect.width / 2;
          
          // Add a random offset but constrain it to visible area
          // Make sure to leave at least 20px from the edge of the screen
          const maxOffset = Math.min(
            window.innerWidth - centerX - 70, // Right boundary (70px for notification width)
            centerX - 70 // Left boundary
          );
          
          // Use a smaller offset range on mobile
          const offsetRange = Math.min(maxOffset, window.innerWidth < 768 ? 30 : 100);
          const xOffset = (Math.random() * offsetRange * 2) - offsetRange;
          
          // Create the notification with the constrained position
          setBonusTimeNotifications(prev => [
            ...prev,
            {
              id: Date.now(),
              amount: bonusTime,
              x: centerX + xOffset,
              y: rect.top - 20
            }
          ]);
          
          // Remove the notification after animation completes
          setTimeout(() => {
            setBonusTimeNotifications(prev => 
              prev.filter(notification => notification.id !== Date.now())
            );
          }, 1500);
        }
      }
    }
    
    // Update reference for next comparison
    previousCaughtCount.current = currentCount;
    
    // End game automatically if all Pokémon are caught
    if (gameState.allCaught && !gameEnded) {
      pauseTimer();
      setGameEnded(true);
      
      // Show the results screen directly for perfect completion
      setShowResults(true);
    }
  }, [
    gameState.caughtPokemon, 
    gameState.allCaught, 
    gameState.totalPokemon,
    timeTrialActive, 
    timeTrialSettings, 
    isRunning, 
    addTime,
    elapsedTime,
    gameEnded,
    pauseTimer,
  ]);

  // Update background effect to use allCaught
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      if (gameState.allCaught) {
        rootElement.classList.add('all-caught');
      } else {
        rootElement.classList.remove('all-caught');
      }
    }
  }, [gameState.allCaught]);

  const showConfirmDialog = (message: string, onConfirm: () => void) => {
    setDialogConfig({
      isOpen: true,
      message,
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check for shared challenge in URL parameters when component mounts
  useEffect(() => {
    if (hasSharedChallenge()) {
      const searchParams = new URLSearchParams(window.location.search);
      const challengeData = decodeTimeTrialChallenge(searchParams);
      
      if (challengeData) {
        setSharedChallenge(challengeData);
        // Clear URL parameters after loading to keep URL clean
        clearChallengeFromUrl();
      }
    }
  }, []);

  const handleStartOver = () => {
    if (gameState.caughtPokemon.length === 0 && gameState.revealedPokemon.length === 0) return;
    
    // Skip confirmation if game is already completed (all caught or gave up)
    if (gameState.allCaught || gameState.revealedPokemon.length > 0) {
      gameState.resetProgress();
      return;
    }

    showConfirmDialog(
      `Are you sure you want to start over?${gameState.caughtPokemon.length > 0 ? ` This will release all ${gameState.caughtPokemon.length} Pokémon.` : ''}`,
      () => {
        gameState.resetProgress();
        closeDialog();
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPokemonGuess(gameState, inputRef);
  };

  const handleGiveUp = async () => {
    if (gameState.caughtPokemon.length === gameState.totalPokemon) {
      return;
    }

    showConfirmDialog(
      `Are you sure you want to give up? This will reveal all remaining Pokémon!`,
      async () => {
        // Pause the timer and mark the game as ended when giving up
        if (timeTrialActive) {
          pauseTimer();
          setGameEnded(true);
        }
        await revealRemainingPokemon(gameState, closeDialog);
      }
    );
  };

  const handleCloseOptions = () => {
    setIsOptionsOpen(false);
  };

  // Handle accepting a shared challenge
  const handleAcceptChallenge = async (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => {
    if (!sharedChallenge) return;
    
    // Start the shared challenge with the decoded parameters
    await handleStartTimeTrial({
      ...settings,
      isDevMode: false // Shared challenges don't support dev mode
    });
  };

  // Handle declining a shared challenge
  const handleDeclineChallenge = () => {
    setSharedChallenge(null);
    setIsOptionsOpen(true); // Show regular options instead
  };

  const handleStartTimeTrial = async (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
    isDevMode?: boolean;
    customInitialTime?: number;
    customTimePerCatch?: number;
  }) => {
    // Save the settings
    setTimeTrialSettings(settings);
    
    // Reset the timer with the appropriate initial time
    let initialTime;
    if (settings.isDevMode && settings.customInitialTime !== undefined) {
      initialTime = settings.customInitialTime;
    } else {
      initialTime = getInitialTimeForDifficulty(settings.difficulty);
    }
    resetTimer(initialTime);
        
    // Check if this is a shared challenge with specific filters
    if (sharedChallenge) {
      // For shared challenges, use the exact filters from the URL
      const { generationIndex, type, letter } = sharedChallenge;
      
      // Reset game state before applying filters
      gameState.resetProgress();
      
      // Apply the specific filters from the shared challenge
      await gameState.changeFilters(generationIndex, type, letter);
      
      // Store the shared challenge data for later sharing
      setSharedChallenge(sharedChallenge);
    } else {
      // For regular challenges, apply random filter combination based on Pokemon count category
      const { pokemonCountCategory } = settings;
      
      // Get the combinations for the selected category
      const validCombinations = filterCombinations[pokemonCountCategory as keyof typeof filterCombinations] as Array<{
        generation: string;
        type: string;
        letter: string;
        count: number;
      }>;
      
      if (validCombinations && validCombinations.length > 0) {
        // Select a random combination
        const randomIndex = Math.floor(Math.random() * validCombinations.length);
        const selectedCombination = validCombinations[randomIndex];
              
        // Reset game state before applying new filters
        gameState.resetProgress();
        
        // Find the generation index that matches the selected generation name
        const generationIndex = GENERATIONS.findIndex(gen => 
          gen.name === selectedCombination.generation
        );
        
        // Apply the filters to the game state
        if (generationIndex !== -1) {
          await gameState.changeFilters(
            generationIndex,
            selectedCombination.type,
            selectedCombination.letter
          );
          
          // Create challenge parameters for sharing regular challenges
          const challengeParams: TimeTrialShareParams = {
            difficulty: settings.difficulty,
            pokemonCountCategory: settings.pokemonCountCategory,
            easyMode: settings.isEasyMode,
            generationIndex: generationIndex,
            type: selectedCombination.type,
            letter: selectedCombination.letter
          };
          setSharedChallenge(challengeParams);
        } else {
          // If we can't find the generation, fall back to using all settings
          await gameState.resetAllFilters();
          
          // Create challenge parameters with default values
          const challengeParams: TimeTrialShareParams = {
            difficulty: settings.difficulty,
            pokemonCountCategory: settings.pokemonCountCategory,
            easyMode: settings.isEasyMode,
            generationIndex: 0,
            type: 'All',
            letter: 'All'
          };
          setSharedChallenge(challengeParams);
        }
      } else {
        // Fallback if no valid combinations exist
        await gameState.resetAllFilters();
        
        // Create challenge parameters with default values
        const challengeParams: TimeTrialShareParams = {
          difficulty: settings.difficulty,
          pokemonCountCategory: settings.pokemonCountCategory,
          easyMode: settings.isEasyMode,
          generationIndex: 0,
          type: 'All',
          letter: 'All'
        };
        setSharedChallenge(challengeParams);
      }
    }
    
    // Set easy mode based on the settings
    gameState.setIsEasyMode(settings.isEasyMode);
    
    // Close the options dialog
    setIsOptionsOpen(false);
    
    // Show the countdown
    setShowCountdown(true);
  };
  
  const handleCountdownComplete = async () => {
    // Hide the countdown
    setShowCountdown(false);
    
    // Start the actual time trial
    setTimeTrialActive(true);
    startTimer();
    
    // Focus the input field to immediately allow typing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="time-trial-mode">
      <div className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="title-container clickable" onClick={onBackToModeSelection}>
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
          <div className="mode-label time-trial-label">Time Trial</div>
        </div>
        
        {/* Timer display - only show when time trial is active */}
        {timeTrialActive && !gameEnded && (
          <div className={`time-trial-timer ${timeRemaining <= 10 ? 'danger' : ''}`}>
            {formatTime(timeRemaining)}
          </div>
        )}
        
        <div className="pokemon-section">
          <h2 className="title" dangerouslySetInnerHTML={{ __html: getFilteredTitle(gameState) }}></h2>
          <SearchForm 
            gameState={gameState} 
            onSubmit={handleSubmit}
            inputRef={inputRef}
          />
          <GameControls 
            gameState={gameState}
            onStartOver={handleStartOver}
            onGiveUp={handleGiveUp}
            isTimeTrialMode={true}
          />
          <PokemonList
            caughtPokemon={gameState.caughtPokemon}
            revealedPokemon={gameState.revealedPokemon}
            filteredPokemon={gameState.filteredPokemon}
            isMuted={gameState.isMuted}
            allCaught={gameState.allCaught}
          />
        </div>
      </div>
      {/* Time Trial Options or Shared Challenge Accept Dialog */}
      {sharedChallenge ? (
        <SharedChallengeAccept
          isOpen={isOptionsOpen}
          onAccept={handleAcceptChallenge}
          onDecline={handleDeclineChallenge}
          difficulty={sharedChallenge.difficulty as TimeTrialDifficulty}
          pokemonCountCategory={sharedChallenge.pokemonCountCategory as PokemonCountCategory}
          isEasyMode={sharedChallenge.easyMode}
        />
      ) : (
        <TimeTrialOptions 
          isOpen={isOptionsOpen}
          onClose={handleCloseOptions}
          onStart={handleStartTimeTrial}
          onHome={onBackToModeSelection}
        />
      )}
      {/* Time Trial Countdown */}
      <TimeTrialCountdown 
        isVisible={showCountdown}
        onComplete={handleCountdownComplete} 
        gameState={gameState}
      />
      {/* Regular confetti for catching a Pokemon */}
      {gameState.confettiProps && (
        <PokemonConfetti
          spriteUrl={gameState.confettiProps.sprite}
          inputPosition={gameState.confettiProps.position}
        />
      )}
      {/* Continuous confetti when all Pokemon are caught */}
      {gameState.allCaught && (
        <PokemonConfetti
          caughtSprites={gameState.caughtPokemon.map(p => p.sprite)}
          isContinuous={true}
        />
      )}
      {/* Bonus time notifications */}
      {bonusTimeNotifications.map(notification => (
        <div 
          key={notification.id} 
          className="time-trial-bonus" 
          style={{ left: notification.x, top: notification.y }}
        >
          +{notification.amount}s
        </div>
      ))}
      <ConfirmDialog 
        isOpen={dialogConfig.isOpen}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={closeDialog}
      />
      {/* Time Trial Results */}
      <TimeTrialResults
        isVisible={showResults}
        caughtCount={gameState.caughtPokemon.length}
        totalPokemon={gameState.totalPokemon}
        elapsedTime={elapsedTime}
        settings={timeTrialSettings}
        challengeParams={sharedChallenge}
        onTryAgain={handleTryAgain}
        onChangeSettings={handleChangeSettings}
        onHome={onBackToModeSelection}
        caughtPokemon={gameState.caughtPokemon}
        filteredPokemon={gameState.filteredPokemon}
        isMuted={gameState.isMuted}
      />
    </div>
  );
};

export default TimeTrialMode;