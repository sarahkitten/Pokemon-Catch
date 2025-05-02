import { type ChangeEvent, useState } from 'react';
import type { GameState } from '../../hooks/useGameState';
import { GENERATIONS, POKEMON_TYPES } from '../../constants';
import { ConfirmDialog } from '../Dialog/ConfirmDialog';
import './FilterMenu.css';
import dieImage from '../../assets/die.png';
import resetImage from '../../assets/reset.png';
import xImage from '../../assets/x.png';
import settingsImage from '../../assets/settings.png';

interface FilterMenuProps {
  gameState: GameState;
  isSidebarCollapsed: boolean;
  isSmallScreen: boolean;
  onToggleSidebar: () => void;
}

interface DialogConfig {
  isOpen: boolean;
  message: string;
  onConfirm: () => Promise<void>;
}

export function FilterMenu({
  gameState,
  isSidebarCollapsed,
  isSmallScreen,
  onToggleSidebar,
}: FilterMenuProps) {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    message: '',
    onConfirm: async () => {}
  });

  const showConfirmDialog = (message: string, onConfirm: () => Promise<void>) => {
    setDialogConfig({
      isOpen: true,
      message,
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleFilterChange = async <T extends string | number>(
    event: ChangeEvent<HTMLSelectElement>,
    filterType: 'generation' | 'type' | 'letter',
    changeFunction: (value: T) => Promise<void>
  ) => {
    const value = filterType === 'generation' ? parseInt(event.target.value) : event.target.value;
    
    // Skip confirmation if game is completed (all caught or gave up)
    if (gameState.allCaught || gameState.revealedPokemon.length > 0) {
      await changeFunction(value as T);
      return;
    }

    if (gameState.caughtPokemon.length > 0) {
      const filterName = {
        'generation': 'generations',
        'type': 'types',
        'letter': 'starting letter'
      }[filterType];
      
      showConfirmDialog(
        `Changing ${filterName} will reset your current progress. Are you sure?`,
        async () => {
          await changeFunction(value as T);
          closeDialog();
        }
      );
    } else {
      await changeFunction(value as T);
    }
  };

  const handleReset = async (
    filterType: 'generation' | 'type' | 'letter' | 'all',
    currentValue: string | number,
    defaultValue: string | number,
    resetFunction: () => Promise<void>
  ) => {
    if (currentValue === defaultValue) return;

    // Skip confirmation if game is completed (all caught or gave up)
    if (gameState.allCaught || gameState.revealedPokemon.length > 0) {
      await resetFunction();
      return;
    }
    
    if (gameState.caughtPokemon.length > 0) {
      const filterName = {
        'generation': 'generation',
        'type': 'type',
        'letter': 'letter filter',
        'all': 'all filters'
      }[filterType];
      
      showConfirmDialog(
        `Resetting ${filterName} will reset your current progress. Are you sure?`,
        async () => {
          await resetFunction();
          closeDialog();
        }
      );
    } else {
      await resetFunction();
    }
  };

  const handleRandomizeAllFilters = async () => {
    // Skip confirmation if game is completed (all caught or gave up)
    if (gameState.allCaught || gameState.revealedPokemon.length > 0) {
      await gameState.randomizeAllFilters();
      return;
    }

    if (gameState.caughtPokemon.length > 0) {
      showConfirmDialog(
        'Randomizing all filters will reset your current progress. Are you sure?',
        async () => {
          await gameState.randomizeAllFilters();
          closeDialog();
        }
      );
    } else {
      await gameState.randomizeAllFilters();
    }
  };

  if (isSidebarCollapsed) {
    return (
      <div className="menu-toggle-button-container">
        <button 
          className="menu-toggle-button nes-btn is-primary" 
          onClick={onToggleSidebar}
          title="Open Filter Menu"
        >
          <img src={settingsImage} alt="Settings" className="icon-image" /> Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`menu nes-container with-title ${isSmallScreen ? 'mobile-menu' : ''}`}>
        <div className="menu-header">
          <h2 className="title">Filter Options</h2>
          <button 
            className="close-menu-button nes-btn is-error" 
            onClick={onToggleSidebar}
            title="Close Filter Menu"
          >
            <img src={xImage} alt="Close" className="icon-image" />
          </button>
        </div>

        <div className="filters">
          <div className="generation-selector">
            <label htmlFor="generation">Choose your region:</label>
            <div className="filter-row">
              <div className="nes-select">
                <select
                  id="generation"
                  onChange={(e) => handleFilterChange(e, 'generation', gameState.changeGeneration)}
                  value={gameState.selectedGenerationIndex}
                >
                  {GENERATIONS.map((gen, index) => (
                    <option key={gen.name} value={index}>
                      {gen.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="randomize-filter nes-btn is-success"
                onClick={() => handleFilterChange(
                  { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                  'generation', 
                  gameState.randomizeGeneration
                )}
                disabled={gameState.getValidOptions('generation').length <= 1}
                title={gameState.getValidOptions('generation').length <= 1 ? "No other valid options" : "Random generation"}
              >
                <img src={dieImage} alt="Random" className="icon-image" />
              </button>
              <button
                className="reset-filter nes-btn"
                onClick={() => handleReset('generation', gameState.selectedGenerationIndex, 0, gameState.resetGeneration)}
                disabled={gameState.selectedGenerationIndex === 0}
                title={gameState.selectedGenerationIndex === 0 ? "Already at default" : "Reset to All Generations"}
              >
                <img src={resetImage} alt="Reset" className="icon-image" />
              </button>
            </div>
          </div>

          <div className="type-selector">
            <label htmlFor="type">Choose Pokemon type:</label>
            <div className="filter-row">
              <div className="nes-select">
                <select
                  id="type"
                  onChange={(e) => handleFilterChange(e, 'type', gameState.changeType)}
                  value={gameState.selectedType}
                >
                  {POKEMON_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="randomize-filter nes-btn is-success"
                onClick={() => handleFilterChange(
                  { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                  'type',
                  gameState.randomizeType
                )}
                disabled={gameState.getValidOptions('type').length <= 1}
                title={gameState.getValidOptions('type').length <= 1 ? "No other valid options" : "Random type"}
              >
                <img src={dieImage} alt="Random" className="icon-image" />
              </button>
              <button
                className="reset-filter nes-btn"
                onClick={() => handleReset('type', gameState.selectedType, POKEMON_TYPES[0], gameState.resetType)}
                disabled={gameState.selectedType === POKEMON_TYPES[0]}
                title={gameState.selectedType === POKEMON_TYPES[0] ? "Already at default" : "Reset to All Types"}
              >
                <img src={resetImage} alt="Reset" className="icon-image" />
              </button>
            </div>
          </div>

          <div className="letter-selector">
            <label htmlFor="letter">First letter must be:</label>
            <div className="filter-row">
              <div className="nes-select">
                <select
                  id="letter"
                  onChange={(e) => handleFilterChange(e, 'letter', gameState.changeLetter)}
                  value={gameState.selectedLetter}
                >
                  <option value="All">All Letters</option>
                  {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="randomize-filter nes-btn is-success"
                onClick={() => handleFilterChange(
                  { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                  'letter',
                  gameState.randomizeLetter
                )}
                disabled={gameState.getValidOptions('letter').length <= 1}
                title={gameState.getValidOptions('letter').length <= 1 ? "No other valid options" : "Random letter"}
              >
                <img src={dieImage} alt="Random" className="icon-image" />
              </button>
              <button
                className="reset-filter nes-btn"
                onClick={() => handleReset('letter', gameState.selectedLetter, "All", gameState.resetLetter)}
                disabled={gameState.selectedLetter === "All"}
                title={gameState.selectedLetter === "All" ? "Already at default" : "Reset to All Letters"}
              >
                <img src={resetImage} alt="Reset" className="icon-image" />
              </button>
            </div>
          </div>

          <button
            className="randomize-button nes-btn is-primary"
            onClick={handleRandomizeAllFilters}
            title="Randomly set all filters"
          >
            <img src={dieImage} alt="Random" className="icon-image" /> Randomize Filters
          </button>

          <button
            className="reset-all-button nes-btn is-warning"
            onClick={() => handleReset(
              'all',
              `${gameState.selectedGenerationIndex}-${gameState.selectedType}-${gameState.selectedLetter}`,
              `0-${POKEMON_TYPES[0]}-All`,
              gameState.resetAllFilters
            )}
            disabled={
              gameState.selectedGenerationIndex === 0 &&
              gameState.selectedType === POKEMON_TYPES[0] &&
              gameState.selectedLetter === "All"
            }
            title={
              gameState.selectedGenerationIndex === 0 &&
              gameState.selectedType === POKEMON_TYPES[0] &&
              gameState.selectedLetter === "All"
                ? "All filters are already at default values"
                : "Reset all filters to default values"
            }
          >
            <img src={resetImage} alt="Reset" className="icon-image" /> Reset All Filters
          </button>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={dialogConfig.isOpen}
        title="Confirm Change"
        message={dialogConfig.message}
        onConfirm={() => {
          dialogConfig.onConfirm();
        }}
        onCancel={closeDialog}
      />
    </>
  );
}