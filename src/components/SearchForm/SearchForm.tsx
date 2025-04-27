import React, { type FormEvent } from 'react';
import type { GameState } from '../../hooks/useGameState';
import type { UseTimeTrialStateReturn } from '../../hooks/useTimeTrialState';
import './SearchForm.css';
import rightArrowImage from '../../assets/right-arrow.png';

interface SearchFormProps {
  gameState: GameState;
  timeTrialState?: UseTimeTrialStateReturn;
  isTimeTrialMode?: boolean;
  onSubmit: (e: FormEvent) => void | Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function SearchForm({ 
  gameState, 
  timeTrialState, 
  isTimeTrialMode = false, 
  onSubmit, 
  inputRef 
}: SearchFormProps) {
  // Determine input value and setter based on mode
  const inputValue = isTimeTrialMode && timeTrialState 
    ? timeTrialState.inputValue 
    : gameState.inputValue;
  
  const setInputValue = (value: string) => {
    if (isTimeTrialMode && timeTrialState) {
      timeTrialState.setInputValue(value);
    } else {
      gameState.setInputValue(value);
    }
  };
  
  // Determine placeholder text based on mode
  const getPlaceholder = () => {
    if (isTimeTrialMode && timeTrialState) {
      if (timeTrialState.isLoading) {
        return "Loading Pokémon data...";
      }
      if (!timeTrialState.isActive) {
        return "Time's up!";
      }
      return "Enter a Pokémon name";
    }
    
    // Regular mode placeholders
    if (gameState.isFetchingData) {
      return "Loading Pokémon data...";
    }
    if (gameState.revealedPokemon.length > 0) {
      return "Nice job!";
    }
    if (gameState.allCaught) {
      return "You caught them all!";
    }
    return "Enter a Pokémon name";
  };
  
  // Determine if input should be disabled
  const isInputDisabled = () => {
    if (isTimeTrialMode && timeTrialState) {
      return !timeTrialState.isActive || timeTrialState.isPaused || timeTrialState.isLoading;
    }
    
    return gameState.isLoading || 
           gameState.revealedPokemon.length > 0 || 
           gameState.isFetchingData || 
           gameState.allCaught;
  };
  
  // Determine if submit button should be disabled
  const isSubmitDisabled = () => {
    if (isTimeTrialMode && timeTrialState) {
      return !timeTrialState.isActive || 
             timeTrialState.isPaused || 
             timeTrialState.isLoading || 
             !inputValue.trim();
    }
    
    return gameState.isLoading || 
           gameState.revealedPokemon.length > 0 || 
           gameState.isFetchingData || 
           !inputValue.trim() || 
           gameState.allCaught;
  };
  
  // Determine error message
  const getErrorMessage = () => {
    if (isTimeTrialMode && timeTrialState) {
      return timeTrialState.error;
    }
    return gameState.error;
  };

  return (
    <>
      <form onSubmit={onSubmit} className="nes-field search-form">
        <div className="search-form-container">
          <input
            ref={inputRef}
            type="text"
            className={`nes-input ${isTimeTrialMode ? 'time-trial-mode' : ''}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={isInputDisabled()}
          />
          <button 
            type="submit" 
            className="nes-btn is-primary search-button"
            disabled={isSubmitDisabled()}
            aria-label="Search"
          >
            <img src={rightArrowImage} alt="Search" className="arrow-icon" />
          </button>
        </div>
      </form>
      <div className="message-container">
        {/* Loading states */}
        {((isTimeTrialMode && timeTrialState?.isLoading) || (!isTimeTrialMode && gameState.isLoading)) && 
          <p className="nes-text is-primary loading">Searching for Pokémon...</p>
        }
        {!isTimeTrialMode && gameState.isFetchingData && 
          <p className="nes-text is-primary loading">Loading Pokémon data...</p>
        }
        
        {/* Error messages */}
        {getErrorMessage() && !((isTimeTrialMode && timeTrialState?.isLoading) || (!isTimeTrialMode && gameState.isLoading)) && 
          <p className="nes-text is-error error">{getErrorMessage()}</p>
        }
        
        {/* No results message */}
        {!isTimeTrialMode && gameState.noResults && 
          <p className="nes-text is-error error">No Pokémon found matching these filters!</p>
        }
        
        {/* Revealed Pokemon message */}
        {!isTimeTrialMode && gameState.revealedPokemon.length > 0 && (
          <p className="nes-text is-success info">Click 'Start Over' to try catching Pokémon again!</p>
        )}
      </div>
    </>
  );
}