import { useState, useRef, useEffect } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'
import { SearchForm } from './components/SearchForm/SearchForm'
import { GameControls } from './components/GameControls/GameControls'
import { PokemonList } from './components/PokemonList/PokemonList'
import { FilterMenu } from './components/FilterMenu/FilterMenu'
import { ConfirmDialog } from './components/Dialog/ConfirmDialog'
import { POKEMON_DATA } from './data/pokemonData'
import type { CaughtPokemon, Pokemon } from './types'
import { UI_CONSTANTS } from './constants'
import { useGameState } from './hooks/useGameState'
import { findClosestPokemon, fetchFormSprite, playPokemonCry, calculateConfettiPosition } from './utils/pokemonUtils'
import titleImageFull from './assets/PokemonCatcherTitleFull.png'

interface DialogConfig {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

function App() {
  const gameState = useGameState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
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
      <FilterMenu 
        gameState={gameState}
        isSidebarCollapsed={isSidebarCollapsed}
        isSmallScreen={isSmallScreen}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
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