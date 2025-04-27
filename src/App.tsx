import { useState, useRef, useEffect } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'
import { SearchForm } from './components/SearchForm/SearchForm'
import { GameControls } from './components/GameControls/GameControls'
import { PokemonList } from './components/PokemonList/PokemonList'
import { FilterMenu } from './components/FilterMenu/FilterMenu'
import { TimeTrialButton } from './components/TimeTrialButton/TimeTrialButton'
import { TimeTrialOptions } from './components/TimeTrialOptions/TimeTrialOptions'
import { TimeTrialCountdown } from './components/TimeTrialCountdown/TimeTrialCountdown'
import { TimeTrialTimer } from './components/TimeTrialTimer/TimeTrialTimer'
import { ConfirmDialog } from './components/Dialog/ConfirmDialog'
import { POKEMON_DATA } from './data/pokemonData'
import type { CaughtPokemon, Pokemon, TimeTrialDifficulty, PokemonCountCategory } from './types'
import { UI_CONSTANTS } from './constants'
import { useGameState } from './hooks/useGameState'
import { useTimeTrialState } from './hooks/useTimeTrialState'
import { findClosestPokemon, fetchFormSprite, playPokemonCry, calculateConfettiPosition } from './utils/pokemonUtils'
import titleImageFull from './assets/PokemonCatcherTitleFull.png'

interface DialogConfig {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

function App() {
  const gameState = useGameState();
  const timeTrialState = useTimeTrialState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTimeTrialOptionsOpen, setIsTimeTrialOptionsOpen] = useState(false);
  const [isTimeTrialCountdownVisible, setIsTimeTrialCountdownVisible] = useState(false);
  const [isTimeTrialMode, setIsTimeTrialMode] = useState(false);
  const [lastTimeAdded, setLastTimeAdded] = useState<number | undefined>(undefined);
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

  const getFilteredTitle = () => {
    let title = 'How many';
    
    // Add generation filter
    if (gameState.selectedGeneration.name !== "All Generations") {
      const genMatch = gameState.selectedGeneration.name.match(/Gen (\d+)/);
      const genNum = genMatch ? genMatch[0] : '';
      title += ` <span class="gen-filter">${genNum}</span>`;
    }

    // Add type filter
    if (gameState.selectedType !== "All Types") {
      title += ` <span class="type-filter">${gameState.selectedType}</span><span class="type-filter">-type</span>`;
    }

    // Add letter filter
    if (gameState.selectedLetter !== "All") {
      title += ` Pokémon starting with <span class="letter-filter">'</span><span class="letter-filter">${gameState.selectedLetter}</span><span class="letter-filter">'</span>`;
    } else {
      title += ' Pokémon';
    }

    title += ' can you catch?';
    return title;
  };

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
    
    // Determine if we're in time trial mode or regular mode
    if (isTimeTrialMode) {
      handleTimeTrialSubmit(e);
    } else {
      handleRegularSubmit(e);
    }
  };

  const handleTimeTrialSubmit = (_e: React.FormEvent) => {
    const inputValue = timeTrialState.inputValue.trim();
    
    if (!inputValue) return;
    
    // Validate the input against the filtered pokemon
    const result = timeTrialState.validateInput(inputValue);
    
    if (result.valid && result.pokemon) {
      // Get the time trial settings to determine time added
      const settings = timeTrialState.getTimeTrialSettings(timeTrialState.difficulty);
      
      // Save the time added for animation
      setLastTimeAdded(settings.timeAddedPerCatch);
      
      // Catch the pokemon (this will add time internally)
      timeTrialState.catchPokemon(result.pokemon);
      
      // Check if timer has ended (all pokemon caught or time up)
      if (!timeTrialState.isActive) {
        // TODO: Show results screen (will be implemented in a future task)
        console.log('Time trial ended!', {
          caughtCount: timeTrialState.caughtPokemon.length,
          totalTime: timeTrialState.startTime ? Math.floor((Date.now() - timeTrialState.startTime) / 1000) : 0,
          difficulty: timeTrialState.difficulty
        });
      }
    }
  };

  const handleRegularSubmit = async (_e: React.FormEvent) => {
    const pokemonName = gameState.inputValue.trim().toLowerCase().replace(/\s+/g, '-');

    gameState.setIsLoading(true);
    gameState.setError('');

    try {
      let pokemon = gameState.filteredPokemon.find(p =>
        p.name.toLowerCase() === pokemonName.toLowerCase() ||
        p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
      );

      if (!pokemon && gameState.isEasyMode) {
        pokemon = findClosestPokemon(pokemonName, gameState.filteredPokemon);
        if (pokemon) {
          gameState.setError(`Accepted "${gameState.inputValue}" as "${pokemon.name}" (Easy Mode)`);
        }
      }

      if (!pokemon) {
        const pokemonExists = POKEMON_DATA.find(p =>
          p.name.toLowerCase() === pokemonName.toLowerCase() ||
          p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
        );

        if (pokemonExists) {
          const inGeneration = gameState.selectedGeneration.name === "All Generations" ||
            (pokemonExists.id >= gameState.selectedGeneration.startId && pokemonExists.id <= gameState.selectedGeneration.endId);

          const matchesType = gameState.selectedType === "All Types" ||
            pokemonExists.types.some(t => t.toLowerCase() === gameState.selectedType.toLowerCase());

          const matchesLetter = gameState.selectedLetter === "All" ||
            pokemonExists.name.toLowerCase().startsWith(gameState.selectedLetter.toLowerCase());

          if (!matchesLetter) {
            gameState.setError(`That Pokémon doesn't start with the letter ${gameState.selectedLetter}!`);
          } else if (!inGeneration) {
            gameState.setError(`That Pokémon is not in ${gameState.selectedGeneration.name}!`);
          } else if (!matchesType) {
            gameState.setError(`That Pokémon is not a ${gameState.selectedType} type!`);
          } else {
            gameState.setError('That\'s not a valid Pokémon name!');
          }
        } else {
          gameState.setError('That\'s not a valid Pokémon name!');
        }
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      const existingPokemon = gameState.caughtPokemon.find(p => {
        const pokemonInData = gameState.filteredPokemon.find(pd =>
          pd.forms.some(f => f.name.toLowerCase() === p.name.toLowerCase())
        );
        return pokemonInData?.name === pokemon.name;
      });

      if (existingPokemon) {
        const isSameForm = gameState.caughtPokemon.some(p => p.name.toLowerCase() === pokemonName.toLowerCase());

        if (isSameForm) {
          gameState.setError(`You already caught ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}!`);
        } else {
          gameState.setError(`You already caught a different form of ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
        }
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      let form;
      if (pokemonName.includes('-')) {
        form = pokemon.forms.find(f => f.name.toLowerCase() === pokemonName.toLowerCase());
      }

      if (!form) {
        form = pokemon.forms.find(f => f.isDefault);
      }

      if (!form) {
        gameState.setError('Could not find a valid form for this Pokemon!');
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      const sprite = await fetchFormSprite(form.name);
      await playPokemonCry(pokemon.id, gameState.isMuted);

      const newCaughtPokemon: CaughtPokemon = {
        name: form.name,
        sprite: sprite || '',
        types: pokemon.types
      };

      gameState.setCaughtPokemon(prev => [newCaughtPokemon, ...prev]);
      gameState.setInputValue('');

      if (inputRef.current) {
        const position = calculateConfettiPosition(inputRef.current);
        gameState.setConfettiProps({
          sprite: newCaughtPokemon.sprite,
          position
        });

        setTimeout(() => {
          gameState.setConfettiProps(null);
        }, UI_CONSTANTS.CONFETTI_ANIMATION_DURATION);

        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
      }
    } catch (error: unknown) {
      console.error('Error in handleSubmit:', error);
      gameState.setError('That\'s not a valid Pokemon name!');
      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
    } finally {
      gameState.setIsLoading(false);
    }
  };

  const handleGiveUp = async () => {
    if (gameState.caughtPokemon.length === gameState.totalPokemon) {
      return;
    }

    showConfirmDialog(
      `Are you sure you want to give up? This will reveal all remaining Pokémon!`,
      async () => {
        gameState.setIsGivingUp(true);
        gameState.setError('');
        gameState.setInputValue('');
        const revealed: Pokemon[] = [];

        try {
          const revealedPokemonData = gameState.filteredPokemon.filter(pokemon =>
            !gameState.caughtPokemon.some(caught =>
              caught.name === pokemon.name ||
              pokemon.forms.some(f => f.name === caught.name)
            )
          );

          for (const pokemon of revealedPokemonData) {
            const defaultForm = pokemon.forms.find(f => f.isDefault);
            const formNameToUse = defaultForm ? defaultForm.name : pokemon.name;

            const sprite = await fetchFormSprite(formNameToUse);
            revealed.push({
              id: pokemon.id,
              name: pokemon.name,
              sprite: sprite || '',
              types: pokemon.types
            });
          }
          gameState.setRevealedPokemon(revealed);
        } catch (err) {
          console.error('Error fetching remaining Pokémon sprites:', err);
        } finally {
          gameState.setIsGivingUp(false);
          closeDialog();
        }
      }
    );
  };

  const handleStartTimeTrial = () => {
    setIsTimeTrialOptionsOpen(true);
  };

  const handleCloseTimeTrialOptions = () => {
    setIsTimeTrialOptionsOpen(false);
  };

  const handleStartTimeTrialGame = (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => {
    // Save the time trial settings
    setTimeTrialSettings(settings);
    // Close the options dialog
    setIsTimeTrialOptionsOpen(false);
    // Show the countdown
    setIsTimeTrialCountdownVisible(true);
  };

  const handleTimeTrialCountdownComplete = () => {
    // Hide the countdown
    setIsTimeTrialCountdownVisible(false);
    
    if (timeTrialSettings) {
      // Start the time trial with the selected settings
      timeTrialState.startTimeTrial(
        timeTrialSettings.difficulty, 
        timeTrialSettings.pokemonCountCategory, 
        timeTrialSettings.isEasyMode
      );
      
      // Generate a random challenge based on the selected Pokemon count category
      timeTrialState.generateRandomChallenge(timeTrialSettings.pokemonCountCategory);
      
      // Switch to time trial mode
      setIsTimeTrialMode(true);
      
      // Focus the input field to start typing
      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
    }
  };

  const handleExitTimeTrial = () => {
    // Confirm with the user before exiting
    showConfirmDialog(
      `Are you sure you want to exit the Time Trial? Your progress will be lost.`,
      () => {
        // Reset time trial state
        timeTrialState.resetTimeTrial();
        // Switch back to regular mode
        setIsTimeTrialMode(false);
        // Reset the last time added state
        setLastTimeAdded(undefined);
        // Close the dialog
        closeDialog();
      }
    );
  };

  return (
    <div className="app">
      <div className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="title-container">
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
        </div>
        <div className="pokemon-section">
          <h2 className="title" dangerouslySetInnerHTML={{ __html: getFilteredTitle() }}></h2>
          <SearchForm 
            gameState={gameState}
            timeTrialState={timeTrialState}
            isTimeTrialMode={isTimeTrialMode} 
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
            isTimeTrialMode={isTimeTrialMode}
            timeTrialCaughtPokemon={timeTrialState.caughtPokemon}
            timeTrialFilteredPokemon={timeTrialState.filteredPokemon}
            totalTimeTrialPokemon={timeTrialState.totalPokemon}
          />
        </div>
      </div>
      <FilterMenu 
        gameState={gameState}
        isSidebarCollapsed={isSidebarCollapsed}
        isSmallScreen={isSmallScreen}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Add Time Trial Button next to Filter Menu */}
      {isSidebarCollapsed && (
        <TimeTrialButton 
          onStartTimeTrial={handleStartTimeTrial} 
          className="next-to-filter"
        />
      )}
      {/* Time Trial Options Dialog */}
      <TimeTrialOptions
        isOpen={isTimeTrialOptionsOpen}
        onClose={handleCloseTimeTrialOptions}
        onStart={handleStartTimeTrialGame}
      />
      {/* Time Trial Countdown */}
      <TimeTrialCountdown 
        isVisible={isTimeTrialCountdownVisible}
        onComplete={handleTimeTrialCountdownComplete}
      />
      {/* Time Trial Timer */}
      {isTimeTrialMode && timeTrialState.isActive && (
        <TimeTrialTimer
          timeRemaining={timeTrialState.timeRemaining}
          timeAdded={lastTimeAdded}
          isActive={timeTrialState.isActive}
          isPaused={timeTrialState.isPaused}
          onExit={handleExitTimeTrial}
        />
      )}
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
      <ConfirmDialog 
        isOpen={dialogConfig.isOpen}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  );
}

export default App;