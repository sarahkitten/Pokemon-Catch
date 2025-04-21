import { type ChangeEvent } from 'react';
import type { GameState } from '../../hooks/useGameState';
import { GENERATIONS, POKEMON_TYPES } from '../../constants';
import './FilterSidebar.css';

interface FilterSidebarProps {
  gameState: GameState;
  isSidebarCollapsed: boolean;
  isSmallScreen: boolean;
  onToggleSidebar: () => void;
}

export function FilterSidebar({
  gameState,
  isSidebarCollapsed,
  isSmallScreen,
  onToggleSidebar
}: FilterSidebarProps) {
  const handleFilterChange = async <T extends string | number>(
    event: ChangeEvent<HTMLSelectElement>,
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

  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={onToggleSidebar}
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
              onChange={(e) => handleFilterChange(e, 'generation', gameState.changeGeneration)}
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
              onClick={() => handleFilterChange(
                { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                'generation', 
                gameState.randomizeGeneration
              )}
              disabled={gameState.getValidOptions('generation').length <= 1}
              title={gameState.getValidOptions('generation').length <= 1 ? "No other valid options" : "Random generation"}
            >
              🎲
            </button>
            <button
              className="reset-filter"
              onClick={() => handleReset('generation', gameState.selectedGenerationIndex, 0, gameState.resetGeneration)}
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
              onChange={(e) => handleFilterChange(e, 'type', gameState.changeType)}
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
              onClick={() => handleFilterChange(
                { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                'type',
                gameState.randomizeType
              )}
              disabled={gameState.getValidOptions('type').length <= 1}
              title={gameState.getValidOptions('type').length <= 1 ? "No other valid options" : "Random type"}
            >
              🎲
            </button>
            <button
              className="reset-filter"
              onClick={() => handleReset('type', gameState.selectedType, POKEMON_TYPES[0], gameState.resetType)}
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
            <button
              className="randomize-filter"
              onClick={() => handleFilterChange(
                { target: { value: "" } } as ChangeEvent<HTMLSelectElement>,
                'letter',
                gameState.randomizeLetter
              )}
              disabled={gameState.getValidOptions('letter').length <= 1}
              title={gameState.getValidOptions('letter').length <= 1 ? "No other valid options" : "Random letter"}
            >
              🎲
            </button>
            <button
              className="reset-filter"
              onClick={() => handleReset('letter', gameState.selectedLetter, "All", gameState.resetLetter)}
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
          onClick={gameState.randomizeAllFilters}
          title="Randomly set all filters"
        >
          🎲 Randomize Filters
        </button>
        <button
          className="reset-all-button"
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
          ↺ Reset All Filters
        </button>
      </div>
    </div>
  );
}