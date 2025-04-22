import React, { type FormEvent } from 'react';
import type { GameState } from '../../hooks/useGameState';
import './SearchForm.css';

interface SearchFormProps {
  gameState: GameState;
  onSubmit: (e: FormEvent) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function SearchForm({ gameState, onSubmit, inputRef }: SearchFormProps) {
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
              ? "Loading Pokémon data..."
              : gameState.revealedPokemon.length > 0
              ? "Nice job!"
              : "Enter a Pokémon name"
          }
          disabled={gameState.isLoading || gameState.revealedPokemon.length > 0 || gameState.isFetchingData}
        />
      </form>
      <div className="message-container">
        {gameState.isLoading && <p className="loading">Searching for Pokémon...</p>}
        {gameState.isFetchingData && <p className="loading">Loading Pokémon data...</p>}
        {gameState.error && !gameState.isLoading && !gameState.isFetchingData && (
          <p className="error">{gameState.error}</p>
        )}
        {gameState.noResults && <p className="error">No Pokémon found matching these filters!</p>}
        {gameState.revealedPokemon.length > 0 && (
          <p className="info">Click 'Start Over' to try catching Pokémon again!</p>
        )}
      </div>
    </>
  );
}