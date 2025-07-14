import type { GameState } from '../../hooks/useGameState';
import './GameControls.css';
import volumeOnImage from '../../assets/volume-on.png';
import volumeOffImage from '../../assets/volume-off.png';

// Check if running in development mode locally
const isLocalDevelopment = () => {
  return import.meta.env.DEV && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === ''
  );
};

// Helper function to catch a random uncaught Pokémon
const catchRandomPokemon = async (gameState: GameState, inputRef: React.RefObject<HTMLInputElement>) => {
  // Get all uncaught Pokémon from the filtered list
  const uncaughtPokemon = gameState.filteredPokemon.filter(pokemon => 
    !gameState.caughtPokemon.some(caught => caught.name === pokemon.name) &&
    !gameState.revealedPokemon.some(revealed => revealed.name === pokemon.name)
  );
  
  if (uncaughtPokemon.length === 0) {
    console.log('No uncaught Pokémon available');
    return;
  }
  
  // Pick a random uncaught Pokémon
  const randomIndex = Math.floor(Math.random() * uncaughtPokemon.length);
  const randomPokemon = uncaughtPokemon[randomIndex];
  
  console.log(`Dev: Attempting to catch ${randomPokemon.name}`);
  
  // Set the input value in React state
  gameState.setInputValue(randomPokemon.name);
  
  // Find the form element and submit it
  if (inputRef?.current) {
    const form = inputRef.current.closest('form');
    if (form) {
      // Create and dispatch a submit event
      const submitEvent = new Event('submit', { 
        bubbles: true, 
        cancelable: true 
      });
      
      // Wait a moment for the state to update, then submit the form
      setTimeout(() => {
        form.dispatchEvent(submitEvent);
      }, 100);
    }
  }
};

interface GameControlsProps {
  gameState: GameState;
  onStartOver: () => void;
  onGiveUp: () => Promise<void>;
  hideStartOver?: boolean;
  hideEasyMode?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function GameControls({ gameState, onStartOver, onGiveUp, hideStartOver = false, hideEasyMode = false, inputRef }: GameControlsProps) {
  const showControls = gameState.caughtPokemon.length > 0 || gameState.revealedPokemon.length > 0;
  const showGiveUp = gameState.revealedPokemon.length === 0 && gameState.caughtPokemon.length < gameState.totalPokemon;
  const showStartOver = showControls && !hideStartOver; // Don't show Start Over when hideStartOver is true

  return (
    <div className="controls">
      {!gameState.noResults && (
        <p className={`counter nes-text ${gameState.caughtPokemon.length === gameState.totalPokemon ? 'is-success' : ''}`}>
          {gameState.isTotalLoading ? (
            <span className="loading-dots" role="status" aria-label="Loading">
              <span>.</span><span>.</span><span>.</span>
            </span>
          ) : gameState.caughtPokemon.length === gameState.totalPokemon ? (
            `Congratulations! You've caught all ${gameState.totalPokemon} Pokémon!`
          ) : (
            `You've caught ${gameState.caughtPokemon.length} Pokémon! ${gameState.totalPokemon - gameState.caughtPokemon.length} to go!`
          )}
        </p>
      )}
      <div className="button-group">
        {showStartOver && (
          <button onClick={onStartOver} className="nes-btn is-primary start-over-button">
            Start Over
          </button>
        )}
        {showGiveUp && (
          <button
            className="nes-btn is-warning give-up-button"
            onClick={onGiveUp}
            disabled={gameState.isGivingUp}
          >
            {gameState.isGivingUp ? "Loading..." : "Give Up"}
          </button>
        )}
        <button
          className={`nes-btn ${gameState.isMuted ? 'is-error' : 'is-success'} mute-button`}
          onClick={() => gameState.setIsMuted(!gameState.isMuted)}
          title={gameState.isMuted ? "Unmute Pokémon cries" : "Mute Pokémon cries"}
        >
          <img 
            src={gameState.isMuted ? volumeOffImage : volumeOnImage} 
            alt={gameState.isMuted ? "Unmute" : "Mute"} 
            className="volume-icon" 
          />
        </button>
        {/* Development-only button */}
        {isLocalDevelopment() && gameState.filteredPokemon.length > 0 && (
          <button
            className="nes-btn dev-button"
            onClick={() => inputRef && catchRandomPokemon(gameState, inputRef)}
            title="Development: Catch a random Pokémon"
          >
            🔧 Catch Random
          </button>
        )}
      </div>
      {!hideEasyMode && (
        <div className="easy-mode-toggle nes-checkbox-container">
          <label>
            <input
              type="checkbox"
              className="nes-checkbox"
              checked={gameState.isEasyMode}
              onChange={(e) => gameState.setIsEasyMode(e.target.checked)}
            />
            <span>Easy Mode (Accept close spellings)</span>
          </label>
        </div>
      )}
    </div>
  );
}