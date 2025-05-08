import { useRef, useEffect, useState, useCallback } from 'react'
import { SearchForm } from '../SearchForm/SearchForm'
import { GameControls } from '../GameControls/GameControls'
import { PokemonList } from '../PokemonList/PokemonList'
import { ConfirmDialog } from '../Dialog/ConfirmDialog'
import { TimeTrialOptions } from '../TimeTrialOptions/TimeTrialOptions'
import { TimeTrialCountdown } from '../TimeTrialCountdown/TimeTrialCountdown'
import { TimeTrialResults } from './TimeTrialResults'
import PokemonConfetti from '../../PokemonConfetti'
import { useGameState } from '../../hooks/useGameState'
import { useTimeTrialTimer, formatTime, getCatchBonusTime } from '../../hooks/useTimeTrialTimer'
import { getFilteredTitle } from '../../utils/pokemonUtils'
import { submitPokemonGuess, revealRemainingPokemon } from '../../utils/pokemonStateUtils'
import filterCombinations from '../../data/filterCombinations.json'
import { GENERATIONS } from '../../constants'
import titleImageFull from '../../assets/PokemonCatcherTitleFull.png'
import type { PokemonCountCategory, TimeTrialDifficulty } from '../../types'
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
  const [timeTrialSettings, setTimeTrialSettings] = useState<{
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  } | null>(null);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bonusTimeNotifications, setBonusTimeNotifications] = useState<{id: number; amount: number; x: number; y: number}[]>([]);
  
  // Initialize timer with the selected difficulty (defaults to medium if none selected)
  const { 
    timeRemaining, 
    elapsedTime,
    isRunning, 
    startTimer, 
    pauseTimer, 
    addTime 
  } = useTimeTrialTimer(
    timeTrialSettings?.difficulty || 'medium'
  );

  // Detect when time runs out and end the game
  useEffect(() => {
    if (timeTrialActive && timeRemaining === 0 && !gameEnded) {
      handleTimeUp();
    }
  }, [timeRemaining, timeTrialActive]);

  // Handle time up - end the game
  const handleTimeUp = useCallback(() => {
    setGameEnded(true);
    pauseTimer();
    setShowResults(true);
  }, [pauseTimer]);
  
  // Handle try again button in results
  const handleTryAgain = useCallback(() => {
    // Reset game state with the same settings
    gameState.resetProgress();
    setGameEnded(false);
    setShowResults(false);
    
    // Start a new countdown
    setShowCountdown(true);
  }, [gameState]);
  
  // Handle change settings button in results
  const handleChangeSettings = useCallback(() => {
    // Reset game and show options
    gameState.resetProgress();
    setGameEnded(false);
    setShowResults(false);
    setTimeTrialActive(false);
    setIsOptionsOpen(true);
  }, [gameState]);

  // Track caught Pokemon and add bonus time when a new one is caught
  const previousCaughtCount = useRef(0);
  useEffect(() => {
    if (!timeTrialActive || !timeTrialSettings) return;
    
    const currentCount = gameState.caughtPokemon.length;
    
    // Check if a new Pokemon was caught
    if (currentCount > previousCaughtCount.current && isRunning) {
      // Add bonus time based on difficulty
      const bonusTime = getCatchBonusTime(timeTrialSettings.difficulty);
      addTime(bonusTime);
      
      // Show bonus time notification
      const lastCaughtPokemon = gameState.caughtPokemon[currentCount - 1];
      if (lastCaughtPokemon) {
        // Create a notification near the input field
        const inputElement = inputRef.current;
        if (inputElement) {
          const rect = inputElement.getBoundingClientRect();
          
          // Add a notification at a random position near the input
          const xOffset = Math.random() * 100 - 50; // Random offset
          setBonusTimeNotifications(prev => [
            ...prev,
            {
              id: Date.now(),
              amount: bonusTime,
              x: rect.right + xOffset,
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
      
      // Show success message
      showConfirmDialog(
        `Congratulations! You caught all ${gameState.totalPokemon} Pokémon in ${formatTime(elapsedTime)}!`,
        closeDialog
      );
    }
  }, [
    gameState.caughtPokemon, 
    gameState.allCaught, 
    timeTrialActive, 
    timeTrialSettings, 
    isRunning, 
    addTime,
    elapsedTime,
    gameEnded,
    pauseTimer
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

  const handleStartTimeTrial = async (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => {
    // Save the settings
    setTimeTrialSettings(settings);
    
    console.log('Time trial settings applied:', settings);
    
    // Apply a random filter combination based on the Pokémon count category immediately
    const { pokemonCountCategory, isEasyMode } = settings;
    
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
      
      console.log('Selected filter combination:', selectedCombination);
      
      // Reset game state before applying new filters
      gameState.resetProgress();
      
      // Find the generation index that matches the selected generation name
      const generationIndex = GENERATIONS.findIndex(gen => 
        gen.name === selectedCombination.generation
      );
      
      // Apply the filters to the game state
      if (generationIndex !== -1) {
        await gameState.changeGeneration(generationIndex);
        await gameState.changeType(selectedCombination.type);
        await gameState.changeLetter(selectedCombination.letter);
      } else {
        // If we can't find the generation, fall back to using all settings
        await gameState.resetAllFilters();
      }
    } else {
      // Fallback if no valid combinations exist
      await gameState.resetAllFilters();
    }
    
    // Set easy mode based on the settings
    gameState.setIsEasyMode(isEasyMode);
    
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
      {/* Time Trial Options Dialog */}
      <TimeTrialOptions 
        isOpen={isOptionsOpen}
        onClose={handleCloseOptions}
        onStart={handleStartTimeTrial}
      />
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
        onTryAgain={handleTryAgain}
        onChangeSettings={handleChangeSettings}
      />
    </div>
  );
};

export default TimeTrialMode;