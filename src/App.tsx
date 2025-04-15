import { useState, useRef, useEffect } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'
import { POKEMON_DATA } from './data/pokemonData'
import type { CaughtPokemon, Pokemon } from './types'
import type { Generation } from './constants';
import { POKEMON_TYPES, GENERATIONS, UI_CONSTANTS } from './constants'
import { useGameState } from './hooks/useGameState'
import { findClosestPokemon, fetchFormSprite, playPokemonCry, calculateConfettiPosition, handlePokemonClick } from './utils/pokemonUtils'

function App() {
  const gameState = useGameState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT);

  useEffect(() => {
    gameState.updateTotalCount(gameState.selectedGeneration, gameState.selectedType);
  }, [gameState.selectedGeneration, gameState.selectedType, gameState.updateTotalCount]);

  useEffect(() => {
    document.documentElement.style.setProperty('--small-screen-breakpoint', `${UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT}px`);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = async <T extends string | number>(
    event: React.ChangeEvent<HTMLSelectElement>,
    filterType: 'generation' | 'type' | 'letter',
    changeFunction: (value: T) => Promise<void>
  ) => {
    const value = filterType === 'generation' ? parseInt(event.target.value) : event.target.value;

    if (gameState.caughtPokemon.length > 0) {
      const filterName = {
        'generation': 'generations',
        'type': 'types',
        'letter': 'starting letter'
      }[filterType];

      const confirmChange = window.confirm(
        `Changing ${filterName} will reset your current progress. Are you sure?`
      );
      if (!confirmChange) return;
    }

    await changeFunction(value as T);
  };

  const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    handleFilterChange<number>(event, 'generation', gameState.changeGeneration);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    handleFilterChange<string>(event, 'type', gameState.changeType);

  const handleLetterChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    handleFilterChange<string>(event, 'letter', gameState.changeLetter);

  const handleReset = async (
    filterType: 'generation' | 'type' | 'letter' | 'all',
    currentValue: string | number,
    defaultValue: string | number,
    resetFunction: () => Promise<void>
  ) => {
    if (currentValue === defaultValue) return;

    if (gameState.caughtPokemon.length > 0) {
      const filterName = {
        'generation': 'generation',
        'type': 'type',
        'letter': 'letter filter',
        'all': 'all filters'
      }[filterType];

      const confirmChange = window.confirm(
        `Resetting ${filterName} will reset your current progress. Are you sure?`
      );
      if (!confirmChange) return;
    }

    await resetFunction();
  };

  const handleGenerationReset = () =>
    handleReset('generation', gameState.selectedGenerationIndex, 0, gameState.resetGeneration);

  const handleTypeReset = () =>
    handleReset('type', gameState.selectedType, POKEMON_TYPES[0], gameState.resetType);

  const handleLetterReset = () =>
    handleReset('letter', gameState.selectedLetter, "All", gameState.resetLetter);

  const handleResetAllFilters = () =>
    handleReset(
      'all',
      `${gameState.selectedGenerationIndex}-${gameState.selectedType}-${gameState.selectedLetter}`,
      `0-${POKEMON_TYPES[0]}-All`,
      gameState.resetAllFilters
    );

  const handleStartOver = () => {
    if (gameState.caughtPokemon.length === 0 && gameState.revealedPokemon.length === 0) return;

    const confirmReset = window.confirm(
      `Are you sure you want to start over?${gameState.caughtPokemon.length > 0 ? ` This will release all ${gameState.caughtPokemon.length} Pokemon.` : ''}`
    );

    if (confirmReset) {
      gameState.resetProgress();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pokemonName = gameState.inputValue.trim().toLowerCase().replace(/\s+/g, '-');

    gameState.setIsLoading(true);
    console.log('Error cleared by start of handleSubmit');
    gameState.setError('');

    try {
      let pokemon = gameState.pokemonData.find(p =>
        p.name.toLowerCase() === pokemonName.toLowerCase() ||
        p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
      );

      if (!pokemon && gameState.isEasyMode) {
        pokemon = findClosestPokemon(pokemonName, gameState.pokemonData);
        if (pokemon) {
          console.log('Accepted fuzzy match:', pokemon.name);
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
            gameState.setError(`That Pokemon doesn't start with the letter ${gameState.selectedLetter}!`);
          } else if (!inGeneration) {
            gameState.setError(`That Pokemon is not in ${gameState.selectedGeneration.name}!`);
          } else if (!matchesType) {
            gameState.setError(`That Pokemon is not a ${gameState.selectedType} type!`);
          } else {
            gameState.setError('That\'s not a valid Pokemon name!');
          }
        } else {
          gameState.setError('That\'s not a valid Pokemon name!');
        }
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      const existingPokemon = gameState.caughtPokemon.find(p => {
        const pokemonInData = gameState.pokemonData.find(pd =>
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

        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        setTimeout(() => gameState.setConfettiProps(null), UI_CONSTANTS.CONFETTI_ANIMATION_DURATION);
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

    const confirmGiveUp = window.confirm(
      `Are you sure you want to give up? This will reveal all remaining Pokemon!`
    );

    if (!confirmGiveUp) return;

    gameState.setIsGivingUp(true);
    console.log('Error cleared by handleGiveUp()');
    gameState.setError('');
    gameState.setInputValue('');
    const revealed: Pokemon[] = [];

    try {
      const revealedPokemonData = gameState.pokemonData.filter(pokemon =>
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
      console.error('Error fetching remaining Pokemon sprites:', err);
    } finally {
      gameState.setIsGivingUp(false);
    }
  };

  const isValidCombination = (generation: Generation, type: string, letter: string): boolean => {
    const filteredPokemon = POKEMON_DATA.filter(pokemon => {
      const inGeneration = generation.name === "All Generations" ||
        (pokemon.id >= generation.startId && pokemon.id <= generation.endId);
      const matchesType = type === "All Types" ||
        pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
      const matchesLetter = letter === "All" ||
        pokemon.name.toLowerCase().startsWith(letter.toLowerCase());
      return inGeneration && matchesType && matchesLetter;
    });
    return filteredPokemon.length > 0;
  };

  const getValidOptions = (filterType: 'generation' | 'type' | 'letter'): number[] | string[] => {
    let letters: string[];

    switch (filterType) {
      case 'generation':
        return GENERATIONS.map((_, index) => index).filter(genIndex => {
          const gen = GENERATIONS[genIndex];
          return isValidCombination(gen, gameState.selectedType, gameState.selectedLetter);
        });
      case 'type':
        return POKEMON_TYPES.filter(type =>
          isValidCombination(gameState.selectedGeneration, type, gameState.selectedLetter)
        );
      case 'letter':
        letters = ["All", ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];
        return letters.filter(letter =>
          isValidCombination(gameState.selectedGeneration, gameState.selectedType, letter)
        );
      default:
        return [];
    }
  };

  const randomizeGeneration = () => {
    const validGenerations = getValidOptions('generation') as number[];
    if (validGenerations.length <= 1) return;

    let randomIndex;
    do {
      randomIndex = validGenerations[Math.floor(Math.random() * validGenerations.length)];
    } while (randomIndex === gameState.selectedGenerationIndex && validGenerations.length > 1);

    handleGenerationChange({ target: { value: randomIndex.toString() } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const randomizeType = () => {
    const validTypes = getValidOptions('type') as string[];
    if (validTypes.length <= 1) return;

    let randomType;
    do {
      randomType = validTypes[Math.floor(Math.random() * validTypes.length)];
    } while (randomType === gameState.selectedType && validTypes.length > 1);

    handleTypeChange({ target: { value: randomType } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const randomizeLetter = () => {
    const validLetters = getValidOptions('letter') as string[];
    if (validLetters.length <= 1) return;

    let randomLetter;
    do {
      randomLetter = validLetters[Math.floor(Math.random() * validLetters.length)];
    } while (randomLetter === gameState.selectedLetter && validLetters.length > 1);

    handleLetterChange({ target: { value: randomLetter } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleRandomize = async () => {
    if (gameState.caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Randomizing filters will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }

    let validCombinationFound = false;
    let attempts = 0;
    const maxAttempts = UI_CONSTANTS.MAX_FILTER_ATTEMPTS;

    while (!validCombinationFound && attempts < maxAttempts) {
      const randomGenIndex = Math.floor(Math.random() * (GENERATIONS.length - 1)) + 1;

      const randomTypeIndex = Math.floor(Math.random() * (POKEMON_TYPES.length - 1)) + 1;

      const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];

      if (isValidCombination(GENERATIONS[randomGenIndex], POKEMON_TYPES[randomTypeIndex], randomLetter)) {
        gameState.setSelectedGenerationIndex(randomGenIndex);
        gameState.setSelectedType(POKEMON_TYPES[randomTypeIndex]);
        gameState.setSelectedLetter(randomLetter);
        gameState.resetProgress();
        await gameState.updateTotalCount(GENERATIONS[randomGenIndex], POKEMON_TYPES[randomTypeIndex], randomLetter);
        validCombinationFound = true;
      }

      attempts++;
    }

    if (!validCombinationFound) {
      gameState.setSelectedGenerationIndex(0);
      gameState.setSelectedType(POKEMON_TYPES[0]);
      gameState.setSelectedLetter("All");
      gameState.resetProgress();
      await gameState.updateTotalCount(GENERATIONS[0], POKEMON_TYPES[0], "All");
    }
  };

  return (
    <div className="app">
      <div className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <h1>Catch them all!</h1>

        <div className="pokemon-section">
          <h2>How many Pokemon can you catch?</h2>

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={gameState.inputValue}
              onChange={(e) => gameState.setInputValue(e.target.value)}
              placeholder={gameState.isFetchingData ? "Loading Pokemon data..." : gameState.revealedPokemon.length > 0 ? "Click 'Start Over' to catch more Pokemon" : "Enter a Pokemon name"}
              disabled={gameState.isLoading || gameState.revealedPokemon.length > 0 || gameState.isFetchingData}
            />
          </form>

          <div className="message-container">
            {gameState.isLoading && <p className="loading">Searching for Pokemon...</p>}
            {gameState.isFetchingData && <p className="loading">Loading Pokemon data...</p>}
            {gameState.error && !gameState.isLoading && !gameState.isFetchingData && <p className="error">{gameState.error}</p>}
            {gameState.noResults && <p className="error">No Pokemon found matching these filters!</p>}
            {gameState.revealedPokemon.length > 0 && (
              <p className="info">Click 'Start Over' to try catching Pokemon again!</p>
            )}
          </div>

          <div className="controls">
            {!gameState.noResults && (
              <p className={`counter ${gameState.caughtPokemon.length === gameState.totalPokemon ? 'success' : ''}`}>
                {gameState.isTotalLoading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : gameState.caughtPokemon.length === gameState.totalPokemon ? (
                  `Congratulations! You've caught all ${gameState.totalPokemon} Pokemon!`
                ) : (
                  `You've caught ${gameState.caughtPokemon.length} Pokemon! ${gameState.totalPokemon - gameState.caughtPokemon.length} to go!`
                )}
              </p>
            )}
            <div className="button-group">
              {(gameState.caughtPokemon.length > 0 || gameState.revealedPokemon.length > 0) && (
                <button onClick={handleStartOver} className="start-over-button">
                  Start Over
                </button>
              )}
              {gameState.revealedPokemon.length === 0 && gameState.caughtPokemon.length < gameState.totalPokemon && (
                <button
                  className="give-up-button"
                  onClick={handleGiveUp}
                  disabled={gameState.isGivingUp}
                >
                  {gameState.isGivingUp ? "Loading..." : "Give Up"}
                </button>
              )}
              <button
                className={`mute-button ${gameState.isMuted ? 'muted' : ''}`}
                onClick={() => gameState.setIsMuted(!gameState.isMuted)}
                title={gameState.isMuted ? "Unmute Pokemon cries" : "Mute Pokemon cries"}
              >
                {gameState.isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>

          {(gameState.caughtPokemon.length > 0 || gameState.revealedPokemon.length > 0) && (
            <div className={`caught-list ${gameState.caughtPokemon.length === gameState.totalPokemon ? 'success' : ''}`}>
              <h3>Pokemon Collection:</h3>
              <div className="pokemon-list">
                {gameState.caughtPokemon.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="pokemon-card"
                    onClick={() => handlePokemonClick(pokemon, gameState.pokemonData, gameState.isMuted)}
                  >
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                    <span>{pokemon.name}</span>
                    <div className="pokemon-types">
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-tag ${type}`}>{type}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {gameState.revealedPokemon.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="pokemon-card uncaught"
                    onClick={() => handlePokemonClick(pokemon, gameState.pokemonData, gameState.isMuted)}
                  >
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                    <span>{pokemon.name}</span>
                    <div className="pokemon-types">
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-tag ${type}`}>{type}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSmallScreen ? (
            isSidebarCollapsed ? "▲" : "▼"
          ) : (
            isSidebarCollapsed ? "▶" : "◀"
          )}
        </button>
        <div className="filters">
          <div className="generation-selector">
            <label htmlFor="generation">Choose your region:</label>
            <div className="filter-row">
              <select
                id="generation"
                onChange={handleGenerationChange}
                value={gameState.selectedGenerationIndex}
              >
                {GENERATIONS.map((gen, index) => (
                  <option key={gen.name} value={index}>
                    {gen.name}
                  </option>
                ))}
              </select>
              <button
                className="randomize-filter"
                onClick={randomizeGeneration}
                disabled={getValidOptions('generation').length <= 1}
                title={getValidOptions('generation').length <= 1 ? "No other valid options" : "Random generation"}
              >
                🎲
              </button>
              <button
                className="reset-filter"
                onClick={handleGenerationReset}
                disabled={gameState.selectedGenerationIndex === 0}
                title={gameState.selectedGenerationIndex === 0 ? "Already at default" : "Reset to All Generations"}
              >
                ↺
              </button>
            </div>
          </div>

          <div className="type-selector">
            <label htmlFor="type">Choose Pokemon type:</label>
            <div className="filter-row">
              <select
                id="type"
                onChange={handleTypeChange}
                value={gameState.selectedType}
              >
                {POKEMON_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                className="randomize-filter"
                onClick={randomizeType}
                disabled={getValidOptions('type').length <= 1}
                title={getValidOptions('type').length <= 1 ? "No other valid options" : "Random type"}
              >
                🎲
              </button>
              <button
                className="reset-filter"
                onClick={handleTypeReset}
                disabled={gameState.selectedType === POKEMON_TYPES[0]}
                title={gameState.selectedType === POKEMON_TYPES[0] ? "Already at default" : "Reset to All Types"}
              >
                ↺
              </button>
            </div>
          </div>

          <div className="letter-selector">
            <label htmlFor="letter">First letter must be:</label>
            <div className="filter-row">
              <select
                id="letter"
                onChange={handleLetterChange}
                value={gameState.selectedLetter}
              >
                <option value="All">All Letters</option>
                {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <button
                className="randomize-filter"
                onClick={randomizeLetter}
                disabled={getValidOptions('letter').length <= 1}
                title={getValidOptions('letter').length <= 1 ? "No other valid options" : "Random letter"}
              >
                🎲
              </button>
              <button
                className="reset-filter"
                onClick={handleLetterReset}
                disabled={gameState.selectedLetter === "All"}
                title={gameState.selectedLetter === "All" ? "Already at default" : "Reset to All Letters"}
              >
                ↺
              </button>
            </div>
          </div>

          <div className="easy-mode-toggle">
            <label>
              <input
                type="checkbox"
                checked={gameState.isEasyMode}
                onChange={(e) => gameState.setIsEasyMode(e.target.checked)}
              />
              Easy Mode (Accept close spellings)
            </label>
          </div>

          <button
            className="randomize-button"
            onClick={handleRandomize}
            title="Randomly set all filters"
          >
            🎲 Randomize Filters
          </button>
          <button
            className="reset-all-button"
            onClick={handleResetAllFilters}
            disabled={gameState.selectedGenerationIndex === 0 && gameState.selectedType === POKEMON_TYPES[0] && gameState.selectedLetter === "All"}
            title={gameState.selectedGenerationIndex === 0 && gameState.selectedType === POKEMON_TYPES[0] && gameState.selectedLetter === "All" ?
              "All filters are already at default values" : "Reset all filters to default values"}
          >
            ↺ Reset All Filters
          </button>
        </div>
      </div>

      {gameState.confettiProps && (
        <PokemonConfetti
          spriteUrl={gameState.confettiProps.sprite}
          inputPosition={gameState.confettiProps.position}
        />
      )}
    </div>
  );
}

export default App;