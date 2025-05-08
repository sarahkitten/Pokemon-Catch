import { useEffect } from 'react';
import { formatTime } from '../../hooks/useTimeTrialTimer';
import type { TimeTrialDifficulty, PokemonCountCategory } from '../../types';
import ultraballIcon from '../../assets/ultraball.svg';
import './TimeTrialResults.css';

interface TimeTrialResultsProps {
  isVisible: boolean;
  caughtCount: number;
  totalPokemon: number;
  elapsedTime: number;
  settings: {
    difficulty: TimeTrialDifficulty;
    pokemonCountCategory: PokemonCountCategory;
    isEasyMode: boolean;
  } | null;
  onTryAgain: () => void;
  onChangeSettings: () => void;
}

export const TimeTrialResults = ({
  isVisible,
  caughtCount,
  totalPokemon,
  elapsedTime,
  settings,
  onTryAgain,
  onChangeSettings
}: TimeTrialResultsProps) => {
  // Calculate percentage of Pokemon caught
  const percentCaught = totalPokemon > 0 ? Math.round((caughtCount / totalPokemon) * 100) : 0;
  const allCaught = caughtCount === totalPokemon;
  
  // Calculate catch rate (Pokemon per minute)
  const catchesPerMinute = elapsedTime > 0 
    ? Math.round((caughtCount / elapsedTime) * 60 * 10) / 10
    : 0;
  
  // Award performance stars based on percentage caught
  const getPerformanceStars = () => {
    if (percentCaught >= 100) return 5;
    if (percentCaught >= 80) return 4;
    if (percentCaught >= 60) return 3;
    if (percentCaught >= 40) return 2;
    if (percentCaught >= 20) return 1;
    return 0;
  };
  
  const stars = getPerformanceStars();
  
  // Get message based on performance
  const getMessage = () => {
    if (allCaught) return "Perfect! You caught them all!";
    if (stars >= 4) return "Amazing job! Nearly perfect!";
    if (stars >= 3) return "Great work! Well done!";
    if (stars >= 2) return "Good effort! Keep practicing!";
    if (stars >= 1) return "Nice try! You can do better!";
    return "Keep trying! You'll improve!";
  };
  
  // Ensure modal is at top of view when opened
  useEffect(() => {
    if (isVisible) {
      window.scrollTo(0, 0);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;

  return (
    <div className="dialog-overlay time-trial-results-overlay">
      <div className="nes-dialog is-rounded time-trial-results-dialog">
        <p className="title time-trial-results-title">
          {allCaught ? "🏆 Perfect Clear! 🏆" : "Time's Up!"}
        </p>
        
        <div className="time-trial-results-content">
          {/* Performance stars */}
          <div className="time-trial-results-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < stars ? "star filled" : "star"}>
                ★
              </span>
            ))}
          </div>
          
          <p className="time-trial-results-message">{getMessage()}</p>
          
          {/* Stats section */}
          <div className="time-trial-results-stats-container">
            <div className="time-trial-results-stat">
              <div className="stat-label">Pokémon Caught</div>
              <div className="stat-value">
                <img src={ultraballIcon} alt="Caught" className="stat-icon" />
                <span>{caughtCount} / {totalPokemon}</span>
              </div>
              <div className="stat-detail">{percentCaught}% complete</div>
            </div>
            
            <div className="time-trial-results-stat">
              <div className="stat-label">Time Elapsed</div>
              <div className="stat-value">
                <span className="time-icon">⏱️</span>
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="stat-detail">{catchesPerMinute} catches/min</div>
            </div>
            
            <div className="time-trial-results-stat">
              <div className="stat-label">Difficulty</div>
              <div className="stat-value">
                {settings?.difficulty === 'easy' && '😊 Easy'}
                {settings?.difficulty === 'medium' && '😐 Medium'}
                {settings?.difficulty === 'hard' && '😰 Hard'}
              </div>
              <div className="stat-detail">
                {settings?.isEasyMode ? 'Easy mode enabled' : 'Standard spelling'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="time-trial-results-actions">
          <button className="nes-btn is-success" onClick={onTryAgain}>
            Try Again
          </button>
          <button className="nes-btn is-primary" onClick={onChangeSettings}>
            Change Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTrialResults;