import type { GameState } from '../../hooks/useGameState';

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
        <p className={`counter ${gameState.caughtPokemon.length === gameState.totalPokemon ? 'success' : ''}`}>
          {gameState.isTotalLoading ? (
            <span className="loading-dots" role="status" aria-label="Loading">
              <span>.</span><span>.</span><span>.</span>
            </span>
          ) : gameState.caughtPokemon.length === gameState.totalPokemon ? (
            `Congratulations! You've caught all ${gameState.totalPokemon} Pokemon!`
          ) : (
            `You've caught ${gameState.caughtPokemon.length} Pokemon! ${gameState.totalPokemon - gameState.caughtPokemon.length} to go!`
          )}
        </p>
      )}
      <div className="button-group">
        {showControls && (
          <button onClick={onStartOver} className="start-over-button">
            Start Over
          </button>
        )}
        {showGiveUp && (
          <button
            className="give-up-button"
            onClick={onGiveUp}
            disabled={gameState.isGivingUp}
          >
            {gameState.isGivingUp ? "Loading..." : "Give Up"}
          </button>
        )}
        <button
          className={`mute-button ${gameState.isMuted ? 'muted' : ''}`}
          onClick={() => gameState.setIsMuted(!gameState.isMuted)}
          title={gameState.isMuted ? "Unmute Pokemon cries" : "Mute Pokemon cries"}
        >
          {gameState.isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}