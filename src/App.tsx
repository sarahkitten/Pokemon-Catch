import { useState, useRef, useEffect } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'
import { POKEMON_DATA } from './data/pokemonData'
import { CaughtPokemon, Pokemon } from './types'
import { POKEMON_TYPES, GENERATIONS, Generation, UI_CONSTANTS } from './constants'
import { useGameState } from './hooks/useGameState'
import { findClosestPokemon, fetchFormSprite, playPokemonCry, calculateConfettiPosition, handlePokemonClick } from './utils/pokemonUtils'

function App() {
  const {
    caughtPokemon,
    inputValue,
    confettiProps,
    selectedGenerationIndex,
    selectedGeneration,
    selectedType,
    selectedLetter,
    totalPokemon,
    isGivingUp,
    revealedPokemon,
    pokemonData,
    isFetchingData,
    isMuted,
    isEasyMode,
    noResults,
    error,
    isLoading,
    isTotalLoading,
    setCaughtPokemon,
    setInputValue,
    setConfettiProps,
    setSelectedGenerationIndex,
    setSelectedType,
    setSelectedLetter,
    setIsGivingUp,
    setRevealedPokemon,
    setIsMuted,
    setIsEasyMode,
    setError,
    setIsLoading,
    resetProgress,
    updateTotalCount,
    changeGeneration,
    changeType,
    changeLetter,
    resetGeneration,
    resetType,
    resetLetter,
    resetAllFilters,
  } = useGameState();
  
  const inputRef = useRef<HTMLInputElement>(null); // Leave
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Leave
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT); // Leave
  
  useEffect(() => {
    updateTotalCount(selectedGeneration, selectedType);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--small-screen-breakpoint', `${UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT}px`);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= UI_CONSTANTS.SMALL_SCREEN_BREAKPOINT);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGenerationChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value);
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing generations will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await changeGeneration(newIndex);
  };

  const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing types will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await changeType(newType);
  };

  const handleLetterChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLetter = event.target.value;
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing starting letter will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await changeLetter(newLetter);
  };

  const handleGenerationReset = async () => {
    if (selectedGenerationIndex === 0) return; // Already at default
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Resetting generation will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await resetGeneration();
  };

  const handleTypeReset = async () => {
    if (selectedType === POKEMON_TYPES[0]) return; // Already at default
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Resetting type will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await resetType();
  };

  const handleLetterReset = async () => {
    if (selectedLetter === "All") return; // Already at default
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Resetting letter filter will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    await resetLetter();
  };

  const handleResetAllFilters = async () => {
    if (selectedGenerationIndex === 0 && selectedType === POKEMON_TYPES[0] && selectedLetter === "All") {
      return; // Already at default values
    }
    
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Resetting all filters will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }

    await resetAllFilters();
  };

  const handleStartOver = () => {
    if (caughtPokemon.length === 0 && revealedPokemon.length === 0) return;
    
    const confirmReset = window.confirm(
      `Are you sure you want to start over?${caughtPokemon.length > 0 ? ` This will release all ${caughtPokemon.length} Pokemon.` : ''}`
    );
    
    if (confirmReset) {
      resetProgress();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let pokemonName = inputValue.trim().toLowerCase().replace(/\s+/g, '-');

    setIsLoading(true);
    console.log('Error cleared by start of handleSubmit');
    setError('');

    try {
      // Find the Pokemon in our pre-fetched data
      let pokemon = pokemonData.find(p => 
        p.name.toLowerCase() === pokemonName.toLowerCase() ||  
        p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
      );

      // If not found and easy mode is on, try fuzzy matching
      if (!pokemon && isEasyMode) {
        pokemon = findClosestPokemon(pokemonName, pokemonData);
        if (pokemon) {
          // Show a message that we accepted a close match without timeout
          console.log('Accepted fuzzy match:', pokemon.name);
          setError(`Accepted "${inputValue}" as "${pokemon.name}" (Easy Mode)`);
        }
      }
      
      if (!pokemon) {
        // Check if the Pokemon exists in POKEMON_DATA but not in current selection
        const pokemonExists = POKEMON_DATA.find(p => 
          p.name.toLowerCase() === pokemonName.toLowerCase() || 
          p.forms.some(f => f.name.toLowerCase() === pokemonName.toLowerCase())
        );

        if (pokemonExists) {
          // Check if it's a generation mismatch
          const inGeneration = selectedGeneration.name === "All Generations" || 
            (pokemonExists.id >= selectedGeneration.startId && pokemonExists.id <= selectedGeneration.endId);
          
          // Check if it's a type mismatch
          const matchesType = selectedType === "All Types" || 
            pokemonExists.types.some(t => t.toLowerCase() === selectedType.toLowerCase());

          // Check if it's a letter mismatch
          const matchesLetter = selectedLetter === "All" || 
            pokemonExists.name.toLowerCase().startsWith(selectedLetter.toLowerCase());

          if (!matchesLetter) {
            setError(`That Pokemon doesn't start with the letter ${selectedLetter}!`);
          } else if (!inGeneration) {
            setError(`That Pokemon is not in ${selectedGeneration.name}!`);
          } else if (!matchesType) {
            setError(`That Pokemon is not a ${selectedType} type!`);
          } else {
            setError('That\'s not a valid Pokemon name!');
          }
        } else {
          setError('That\'s not a valid Pokemon name!');
        }
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      // Check if any form of this Pokemon is already caught
      const existingPokemon = caughtPokemon.find(p => {
        const pokemonInData = pokemonData.find(pd => 
          pd.forms.some(f => f.name.toLowerCase() === p.name.toLowerCase())
        );
        return pokemonInData?.name === pokemon.name;
      });

      if (existingPokemon) {
        // Check if they're trying to catch the exact same form
        const isSameForm = caughtPokemon.some(p => p.name.toLowerCase() === pokemonName.toLowerCase());
        
        if (isSameForm) {
          setError(`You already caught ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}!`);
        } else {
          setError(`You already caught a different form of ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
        }
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      // Determine which form to use
      let form;
      if (pokemonName.includes('-')) {
        // If input includes a form, try to find that specific form
        form = pokemon.forms.find(f => f.name.toLowerCase() === pokemonName.toLowerCase());
      }
      
      // If no specific form found or no form specified, use the default form
      if (!form) {
        form = pokemon.forms.find(f => f.isDefault);
      }

      if (!form) {
        setError('Could not find a valid form for this Pokemon!');
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        return;
      }

      // Fetch sprite using the enhanced function
      const sprite = await fetchFormSprite(form.name);

      // Play the Pokemon's cry
      await playPokemonCry(pokemon.id, isMuted);

      const newCaughtPokemon: CaughtPokemon = {
        name: form.name,
        sprite: sprite || '',
        types: pokemon.types
      };

      setCaughtPokemon(prev => [newCaughtPokemon, ...prev]);
      setInputValue('');
      
      if (inputRef.current) {
        const position = calculateConfettiPosition(inputRef.current);
        setConfettiProps({
          sprite: newCaughtPokemon.sprite,
          position
        });
        
        setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
        setTimeout(() => setConfettiProps(null), UI_CONSTANTS.CONFETTI_ANIMATION_DURATION);
      }
    } catch (err) {
      setError('That\'s not a valid Pokemon name!');
      setTimeout(() => inputRef.current?.focus(), UI_CONSTANTS.INPUT_FOCUS_DELAY);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGiveUp = async () => {
    if (caughtPokemon.length === totalPokemon) {
      return; // No need to give up if all Pokemon are caught
    }

    const confirmGiveUp = window.confirm(
      `Are you sure you want to give up? This will reveal all remaining Pokemon!`
    );
    
    if (!confirmGiveUp) return;

    setIsGivingUp(true);
    console.log('Error cleared by handleGiveUp()');
    setError(''); // Clear any error messages
    setInputValue(''); // Clear the input field
    const revealed: Pokemon[] = [];
    
    try {
      // Filter pokemonData to get remaining Pokemon to reveal
      const revealedPokemonData = pokemonData.filter(pokemon => 
        !caughtPokemon.some(caught => 
          caught.name === pokemon.name || 
          pokemon.forms.some(f => f.name === caught.name)
        )
      );

      // Get sprites for revealed Pokemon using our existing fetchSprite function
      for (const pokemon of revealedPokemonData) {
        // Find the default form
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
      setRevealedPokemon(revealed);
    } catch (err) {
      console.error('Error fetching remaining Pokemon sprites:', err);
    } finally {
      setIsGivingUp(false);
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
    switch (filterType) {
      case 'generation':
        return GENERATIONS.map((_, index) => index).filter(genIndex => {
          const gen = GENERATIONS[genIndex];
          return isValidCombination(gen, selectedType, selectedLetter);
        });
      case 'type':
        return POKEMON_TYPES.filter(type => 
          isValidCombination(selectedGeneration, type, selectedLetter)
        );
      case 'letter':
        const letters = ["All", ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];
        return letters.filter(letter => 
          isValidCombination(selectedGeneration, selectedType, letter)
        );
      default:
        return [];
    }
  };

  const randomizeGeneration = () => {
    const validGenerations = getValidOptions('generation') as number[];
    if (validGenerations.length <= 1) return; // No other valid options

    let randomIndex;
    do {
      randomIndex = validGenerations[Math.floor(Math.random() * validGenerations.length)];
    } while (randomIndex === selectedGenerationIndex && validGenerations.length > 1);

    handleGenerationChange({ target: { value: randomIndex.toString() } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const randomizeType = () => {
    const validTypes = getValidOptions('type') as string[];
    if (validTypes.length <= 1) return; // No other valid options

    let randomType;
    do {
      randomType = validTypes[Math.floor(Math.random() * validTypes.length)];
    } while (randomType === selectedType && validTypes.length > 1);

    handleTypeChange({ target: { value: randomType } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const randomizeLetter = () => {
    const validLetters = getValidOptions('letter') as string[];
    if (validLetters.length <= 1) return; // No other valid options

    let randomLetter;
    do {
      randomLetter = validLetters[Math.floor(Math.random() * validLetters.length)];
    } while (randomLetter === selectedLetter && validLetters.length > 1);

    handleLetterChange({ target: { value: randomLetter } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleRandomize = async () => {
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Randomizing filters will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }

    let validCombinationFound = false;
    let attempts = 0;
    const maxAttempts = UI_CONSTANTS.MAX_FILTER_ATTEMPTS; // Prevent infinite loop if something goes wrong
    
    while (!validCombinationFound && attempts < maxAttempts) {
      // Random generation (excluding "All Generations")
      const randomGenIndex = Math.floor(Math.random() * (GENERATIONS.length - 1)) + 1;
      
      // Random type (excluding "All Types")
      const randomTypeIndex = Math.floor(Math.random() * (POKEMON_TYPES.length - 1)) + 1;
      
      // Random letter (excluding "All")
      const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];

      // Check if this combination would return results
      if (isValidCombination(GENERATIONS[randomGenIndex], POKEMON_TYPES[randomTypeIndex], randomLetter)) {
        setSelectedGenerationIndex(randomGenIndex);
        setSelectedType(POKEMON_TYPES[randomTypeIndex]);
        setSelectedLetter(randomLetter);
        resetProgress();
        await updateTotalCount(GENERATIONS[randomGenIndex], POKEMON_TYPES[randomTypeIndex], randomLetter);
        validCombinationFound = true;
      }

      attempts++;
    }

    // If we couldn't find a valid combination, fall back to a safe combination
    if (!validCombinationFound) {
      // Reset to "All Generations", "All Types", and "All" letter as a fallback
      setSelectedGenerationIndex(0);
      setSelectedType(POKEMON_TYPES[0]);
      setSelectedLetter("All");
      resetProgress();
      await updateTotalCount(GENERATIONS[0], POKEMON_TYPES[0], "All");
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isFetchingData ? "Loading Pokemon data..." : revealedPokemon.length > 0 ? "Click 'Start Over' to catch more Pokemon" : "Enter a Pokemon name"}
              disabled={isLoading || revealedPokemon.length > 0 || isFetchingData}
            />
          </form>

          <div className="message-container">
            {isLoading && <p className="loading">Searching for Pokemon...</p>}
            {isFetchingData && <p className="loading">Loading Pokemon data...</p>}
            {error && !isLoading && !isFetchingData && <p className="error">{error}</p>}
            {noResults && <p className="error">No Pokemon found matching these filters!</p>}
            {revealedPokemon.length > 0 && (
              <p className="info">Click 'Start Over' to try catching Pokemon again!</p>
            )}
          </div>
          
          <div className="controls">
            {!noResults && (
              <p className={`counter ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
                {isTotalLoading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : caughtPokemon.length === totalPokemon ? (
                  `Congratulations! You've caught all ${totalPokemon} Pokemon!`
                ) : (
                  `You've caught ${caughtPokemon.length} Pokemon! ${totalPokemon - caughtPokemon.length} to go!`
                )}
              </p>
            )}
            <div className="button-group">
              {(caughtPokemon.length > 0 || revealedPokemon.length > 0) && (
                <button onClick={handleStartOver} className="start-over-button">
                  Start Over
                </button>
              )}
              {revealedPokemon.length === 0 && caughtPokemon.length < totalPokemon && (
                <button
                  className="give-up-button"
                  onClick={handleGiveUp}
                  disabled={isGivingUp}
                >
                  {isGivingUp ? "Loading..." : "Give Up"}
                </button>
              )}
              <button
                className={`mute-button ${isMuted ? 'muted' : ''}`}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute Pokemon cries" : "Mute Pokemon cries"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>

          {(caughtPokemon.length > 0 || revealedPokemon.length > 0) && (
            <div className={`caught-list ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
              <h3>Pokemon Collection:</h3>
              <div className="pokemon-list">
                {caughtPokemon.map((pokemon) => (
                  <div 
                    key={pokemon.name} 
                    className="pokemon-card"
                    onClick={() => handlePokemonClick(pokemon, pokemonData, isMuted)}
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
                {revealedPokemon.map((pokemon) => (
                  <div 
                    key={pokemon.name} 
                    className="pokemon-card uncaught"
                    onClick={() => handlePokemonClick(pokemon, pokemonData, isMuted)}
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
                value={selectedGenerationIndex}
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
                disabled={selectedGenerationIndex === 0}
                title={selectedGenerationIndex === 0 ? "Already at default" : "Reset to All Generations"}
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
                value={selectedType}
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
                disabled={selectedType === POKEMON_TYPES[0]}
                title={selectedType === POKEMON_TYPES[0] ? "Already at default" : "Reset to All Types"}
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
                value={selectedLetter}
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
                disabled={selectedLetter === "All"}
                title={selectedLetter === "All" ? "Already at default" : "Reset to All Letters"}
              >
                ↺
              </button>
            </div>
          </div>

          <div className="easy-mode-toggle">
            <label>
              <input
                type="checkbox"
                checked={isEasyMode}
                onChange={(e) => setIsEasyMode(e.target.checked)}
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
            disabled={selectedGenerationIndex === 0 && selectedType === POKEMON_TYPES[0] && selectedLetter === "All"}
            title={selectedGenerationIndex === 0 && selectedType === POKEMON_TYPES[0] && selectedLetter === "All" ? 
              "All filters are already at default values" : "Reset all filters to default values"}
          >
            ↺ Reset All Filters
          </button>
        </div>
      </div>

      {confettiProps && (
        <PokemonConfetti
          spriteUrl={confettiProps.sprite}
          inputPosition={confettiProps.position}
        />
      )}
    </div>
  );
}

export default App;