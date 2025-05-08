import { useState, useEffect } from 'react';
import { getFilteredTitle } from '../../utils/pokemonUtils';
import type { GameState } from '../../hooks/useGameState';
import './TimeTrialCountdown.css';

interface TimeTrialCountdownProps {
  isVisible: boolean;
  onComplete: () => void;
  gameState: GameState;
}

export const TimeTrialCountdown: React.FC<TimeTrialCountdownProps> = ({ 
  isVisible, 
  onComplete,
  gameState 
}) => {
  const [count, setCount] = useState<number | null>(null);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      // Reset the state when the component is hidden
      setCount(null);
      setShowGo(false);
      return;
    }

    // Start the countdown
    setCount(3);
    
    // Set up the countdown timer
    const countdownInterval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === null) return null;
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          setShowGo(true);
          
          // After showing "GO!", complete the countdown
          setTimeout(() => {
            onComplete();
            setShowGo(false);
          }, 1000);
          
          return null;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="time-trial-countdown-overlay">
      <div className="time-trial-countdown-container">
        <div className="time-trial-filter-title" 
             dangerouslySetInnerHTML={{ __html: getFilteredTitle(gameState) }}>
        </div>
        
        <div className="time-trial-pokemon-count">
          Total: <span className="count-number">{gameState.totalPokemon}</span>
        </div>
        
        {count !== null && (
          <p key={`count-${count}`} className="time-trial-countdown-number">
            {count}
          </p>
        )}
        {showGo && (
          <p className="time-trial-countdown-go">GO!</p>
        )}
      </div>
    </div>
  );
};

export default TimeTrialCountdown;