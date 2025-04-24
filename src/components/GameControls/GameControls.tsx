import type { GameState } from '../../hooks/useGameState';
import './GameControls.css';
import volumeOnImage from '../../assets/volume-on.png';
import volumeOffImage from '../../assets/volume-off.png';

interface GameControlsProps {
  gameState: GameState;
  onStartOver: () => void;
  onGiveUp: () => Promise<void>;
}

export function GameControls({ gameState, onStartOver, onGiveUp }: GameControlsProps) {
  const showControls = gameState.caughtPokemon.length > 0 || gameState.revealedPokemon.length > 0;
  const showGiveUp = gameState.revealedPokemon.length === 0 && gameState.caughtPokemon.length < gameState.totalPokemon;

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
        {showControls && (
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
      </div>
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
    </div>
  );
}