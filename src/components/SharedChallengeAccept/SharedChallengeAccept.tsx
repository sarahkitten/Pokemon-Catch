import type { TimeTrialDifficulty, PokemonCountCategory } from '../../types';
import './SharedChallengeAccept.css';
import '../Dialog/Dialog.css';

interface SharedChallengeAcceptProps {
  isOpen: boolean;
  onAccept: (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => void;
  onDecline: () => void;
  difficulty: TimeTrialDifficulty;
  pokemonCountCategory: PokemonCountCategory;
  isEasyMode: boolean;
}

export function SharedChallengeAccept({
  isOpen,
  onAccept,
  onDecline,
  difficulty,
  pokemonCountCategory,
  isEasyMode
}: SharedChallengeAcceptProps) {
  // If the dialog is not open, don't render anything
  if (!isOpen) return null;

  // Handler for accepting the challenge
  const handleAccept = () => {
    onAccept({
      difficulty,
      pokemonCountCategory,
      isEasyMode
    });
  };

  // Get difficulty emoji and description
  const getDifficultyInfo = () => {
    switch (difficulty) {
      case 'easy':
        return { emoji: '😊', name: 'Easy', description: 'Generous time limits' };
      case 'medium':
        return { emoji: '😐', name: 'Medium', description: 'Balanced challenge' };
      case 'hard':
        return { emoji: '😰', name: 'Hard', description: 'Limited time' };
      default:
        return { emoji: '😐', name: 'Medium', description: 'Balanced challenge' };
    }
  };

  const difficultyInfo = getDifficultyInfo();

  return (
    <div className="dialog-overlay">
      <div className="nes-dialog is-rounded shared-challenge-accept-dialog">
        <p className="title shared-challenge-accept-title">🎯 Challenge Received!</p>
        
        <div className="shared-challenge-accept-content">
          <div className="shared-challenge-accept-message">
            <p>Someone has challenged you to a Time Trial!</p>
            <p>Are you ready to test your Pokémon knowledge?</p>
          </div>

          {/* Challenge Preview */}
          <div className="shared-challenge-preview">
            <div className="challenge-preview-item">
              <span className="preview-label">Difficulty:</span>
              <span className="preview-value">
                {difficultyInfo.emoji} {difficultyInfo.name}
              </span>
              <span className="preview-description">{difficultyInfo.description}</span>
            </div>
            
            <div className="challenge-preview-item">
              <span className="preview-label">Mode:</span>
              <span className="preview-value">
                {isEasyMode ? '✨ Easy Spelling' : '📝 Exact Spelling'}
              </span>
              <span className="preview-description">
                {isEasyMode ? 'Close spellings accepted' : 'Exact spelling required'}
              </span>
            </div>

            <div className="challenge-mystery">
              <p>🔍 The specific Pokémon filters will be revealed when you start!</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="shared-challenge-instructions">
            <h3>How it works:</h3>
            <ul>
              <li>You'll have limited time to catch as many Pokémon as possible</li>
              <li>Each Pokémon you catch adds bonus time</li>
              <li>Try to catch them all before time runs out!</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="shared-challenge-accept-actions">
          <button className="nes-btn is-primary shared-challenge-accept-btn" onClick={handleAccept}>
            🚀 Accept Challenge
          </button>
          <button className="nes-btn is-error shared-challenge-decline-btn" onClick={onDecline}>
            ❌ Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharedChallengeAccept;
