import { type FormEvent, useRef } from 'react';
import type { GameState } from '../../hooks/useGameState';

interface SearchFormProps {
  gameState: GameState;
  onSubmit: (e: FormEvent) => Promise<void>;
}

export function SearchForm({ gameState, onSubmit }: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={gameState.inputValue}
          onChange={(e) => gameState.setInputValue(e.target.value)}
          placeholder={
            gameState.isFetchingData
              ? "Loading Pokemon data..."
              : gameState.revealedPokemon.length > 0
              ? "Click 'Start Over' to catch more Pokemon"
              : "Enter a Pokemon name"
          }
          disabled={gameState.isLoading || gameState.revealedPokemon.length > 0 || gameState.isFetchingData}
        />
      </form>

      <div className="message-container">
        {gameState.isLoading && <p className="loading">Searching for Pokemon...</p>}
        {gameState.isFetchingData && <p className="loading">Loading Pokemon data...</p>}
        {gameState.error && !gameState.isLoading && !gameState.isFetchingData && (
          <p className="error">{gameState.error}</p>
        )}
        {gameState.noResults && <p className="error">No Pokemon found matching these filters!</p>}
        {gameState.revealedPokemon.length > 0 && (
          <p className="info">Click 'Start Over' to try catching Pokemon again!</p>
        )}
      </div>
    </>
  );
}