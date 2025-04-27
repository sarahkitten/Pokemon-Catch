import { useState } from 'react';
import type { PokemonCountCategory, TimeTrialDifficulty } from '../../types';
import { TIME_TRIAL } from '../../constants';
import './TimeTrialOptions.css';
import '../Dialog/Dialog.css';

interface TimeTrialOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  }) => void;
}

export function TimeTrialOptions({ isOpen, onClose, onStart }: TimeTrialOptionsProps) {
  // State for the options
  const [difficulty, setDifficulty] = useState<TimeTrialDifficulty>('medium');
  const [pokemonCountCategory, setPokemonCountCategory] = useState<PokemonCountCategory>('6-20');
  const [isEasyMode, setIsEasyMode] = useState(false);

  // If the dialog is not open, don't render anything
  if (!isOpen) return null;

  // Calculate the description based on the selected options
  const selectedDifficultySettings = getDifficultySettings(difficulty);
  
  const description = `Start with ${selectedDifficultySettings.initialTime} seconds. 
  Earn +${selectedDifficultySettings.timePerCatch} seconds for each Pokemon caught. 
  ${isEasyMode ? 'Easy Mode enabled: all matching Pokémon will be shown.' : ''}`;

  // Handler for starting the time trial
  const handleStart = () => {
    onStart({
      difficulty,
      pokemonCountCategory,
      isEasyMode
    });
  };

  return (
    <div className="dialog-overlay">
      <div className="nes-dialog is-rounded time-trial-options-dialog">
        <p className="title time-trial-options-title">Time Trial Options</p>
        
        {/* Difficulty Section */}
        <div className="time-trial-options-section">
          <p className="time-trial-options-section-title">Difficulty</p>
          <div className="time-trial-options-grid">
            {Object.entries(TIME_TRIAL.DIFFICULTY).map(([key, value]) => {
              const diffKey = key.toLowerCase() as TimeTrialDifficulty;
              return (
                <button
                  key={diffKey}
                  className={`nes-btn time-trial-option-button ${
                    difficulty === diffKey ? 'is-primary' : ''
                  }`}
                  onClick={() => setDifficulty(diffKey)}
                >
                  {value.name}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Pokemon Count Section */}
        <div className="time-trial-options-section">
          <p className="time-trial-options-section-title">Pokemon Count</p>
          <div className="time-trial-options-grid">
            {Object.values(TIME_TRIAL.POKEMON_COUNT_CATEGORIES).map((category) => (
              <button
                key={category.name}
                className={`nes-btn time-trial-option-button ${
                  pokemonCountCategory === category.name ? 'is-primary' : ''
                }`}
                onClick={() => setPokemonCountCategory(category.name as PokemonCountCategory)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Easy Mode Toggle */}
        <div className="time-trial-options-section">
          <div className="time-trial-options-toggle">
            <label>
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={isEasyMode}
                onChange={(e) => setIsEasyMode(e.target.checked)}
              />
              <span>Easy Mode</span>
            </label>
          </div>
          <p className="time-trial-options-description">
            {isEasyMode 
              ? "Show all matching Pokémon instead of having to guess" 
              : "Try to guess which Pokémon match the current filters"}
          </p>
        </div>
        
        {/* Description */}
        <p className="time-trial-options-description">
          {description}
        </p>
        
        {/* Action Buttons */}
        <div className="time-trial-options-actions">
          <button className="nes-btn is-primary" onClick={handleStart}>
            Start
          </button>
          <button className="nes-btn is-error" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get difficulty settings based on the selected difficulty
function getDifficultySettings(difficulty: TimeTrialDifficulty) {
  switch (difficulty) {
    case 'easy':
      return TIME_TRIAL.DIFFICULTY.EASY;
    case 'medium':
      return TIME_TRIAL.DIFFICULTY.MEDIUM;
    case 'hard':
      return TIME_TRIAL.DIFFICULTY.HARD;
    default:
      return TIME_TRIAL.DIFFICULTY.MEDIUM;
  }
}