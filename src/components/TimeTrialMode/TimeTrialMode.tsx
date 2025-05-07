import { useRef, useEffect } from 'react'
import { SearchForm } from '../SearchForm/SearchForm'
import { GameControls } from '../GameControls/GameControls'
import { PokemonList } from '../PokemonList/PokemonList'
import { FilterMenu } from '../FilterMenu/FilterMenu'
import { ConfirmDialog } from '../Dialog/ConfirmDialog'
import { TimeTrialOptions } from '../TimeTrialOptions/TimeTrialOptions'
import PokemonConfetti from '../../PokemonConfetti'
import { useGameState } from '../../hooks/useGameState'
import { getFilteredTitle } from '../../utils/pokemonUtils'
import { submitPokemonGuess, revealRemainingPokemon } from '../../utils/pokemonStateUtils'
import titleImageFull from '../../assets/PokemonCatcherTitleFull.png'
import { useState } from 'react'
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true); // Start with options open
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
        await revealRemainingPokemon(gameState, closeDialog);
      }
    );
  };

  const handleCloseOptions = () => {
    setIsOptionsOpen(false);
  };

  const handleStartTimeTrial = (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => {
    // Apply the time trial settings 
    console.log('Time trial settings applied:', settings);
    // In a real implementation, you would update game state with these settings
    // For example:
    // - Set the timer based on difficulty
    // - Filter Pokemon based on the count category
    // - Enable/disable spell checking based on isEasyMode
    
    setIsOptionsOpen(false);
  };

  return (
    <div className="time-trial-mode">
      <div className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="title-container clickable" onClick={onBackToModeSelection}>
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
          <div className="mode-label time-trial-label">Time Trial</div>
        </div>
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
      <FilterMenu 
        gameState={gameState}
        isSidebarCollapsed={isSidebarCollapsed}
        isSmallScreen={isSmallScreen}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Time Trial Options Dialog */}
      <TimeTrialOptions 
        isOpen={isOptionsOpen}
        onClose={handleCloseOptions}
        onStart={handleStartTimeTrial}
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
};

export default TimeTrialMode;