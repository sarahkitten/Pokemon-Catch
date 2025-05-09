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
    isDevMode?: boolean;
    customInitialTime?: number;
    customTimePerCatch?: number;
  }) => void;
  onHome?: () => void; // Added navigation prop
}

export function TimeTrialOptions({ isOpen, onClose, onStart, onHome }: TimeTrialOptionsProps) {
  // State for the options
  const [difficulty, setDifficulty] = useState<TimeTrialDifficulty>('medium');
  const [pokemonCountCategory, setPokemonCountCategory] = useState<PokemonCountCategory>('6-20');
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [customInitialTime, setCustomInitialTime] = useState<number>(90);
  const [customTimePerCatch, setCustomTimePerCatch] = useState<number>(10);

  // If the dialog is not open, don't render anything
  if (!isOpen) return null;

  // Calculate the description based on the selected options
  const selectedDifficultySettings = getDifficultySettings(difficulty);
  
  // Use either custom values (if dev mode is on) or preset values
  const initialTime = isDevMode ? customInitialTime : selectedDifficultySettings.initialTime;
  const timePerCatch = isDevMode ? customTimePerCatch : selectedDifficultySettings.timePerCatch;
  
  const description = `Start with ${initialTime} seconds. 
  Earn +${timePerCatch} seconds for each Pokemon caught.`;

  // Handler for starting the time trial
  const handleStart = () => {
    onStart({
      difficulty,
      pokemonCountCategory,
      isEasyMode,
      isDevMode,
      customInitialTime: isDevMode ? customInitialTime : undefined,
      customTimePerCatch: isDevMode ? customTimePerCatch : undefined
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
              <span>Easy Mode (accept close spellings)</span>
            </label>
          </div>
          <p className="time-trial-options-description">
            Try to catch all the Pokémon that match the description!
          </p>
        </div>
        
        {/* Dev Mode Toggle */}
        <div className="time-trial-options-section">
          <div className="time-trial-options-toggle">
            <label>
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={isDevMode}
                onChange={(e) => setIsDevMode(e.target.checked)}
              />
              <span>Dev Mode (customize settings)</span>
            </label>
          </div>
          {isDevMode && (
            <div className="time-trial-options-dev-settings">
              <label>
                Initial Time:
                <input
                  type="number"
                  className="nes-input"
                  value={customInitialTime}
                  onChange={(e) => setCustomInitialTime(Number(e.target.value))}
                />
              </label>
              <label>
                Time Per Catch:
                <input
                  type="number"
                  className="nes-input"
                  value={customTimePerCatch}
                  onChange={(e) => setCustomTimePerCatch(Number(e.target.value))}
                />
              </label>
            </div>
          )}
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
          <button className="nes-btn is-error" onClick={onHome || onClose}>
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