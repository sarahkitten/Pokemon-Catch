import { useState, useEffect, useRef } from 'react';
import './TimeTrialTimer.css';

interface TimeTrialTimerProps {
  timeRemaining: number;
  // Optional prop for when time is added after catching a Pokemon
  timeAdded?: number;
  isActive: boolean;
  isPaused: boolean;
  onExit?: () => void; // Add exit handler
}

export const TimeTrialTimer: React.FC<TimeTrialTimerProps> = ({
  timeRemaining,
  timeAdded,
  isActive,
  isPaused,
  onExit
}) => {
  const [showTimeAddedAnimation, setShowTimeAddedAnimation] = useState(false);
  const prevTimeRef = useRef(timeRemaining);

  // Format the seconds into MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Detect when time is added and show animation
  useEffect(() => {
    if (timeRemaining > prevTimeRef.current && isActive && !isPaused) {
      setShowTimeAddedAnimation(true);
      
      // Hide the animation after 1 second
      const timer = setTimeout(() => {
        setShowTimeAddedAnimation(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    prevTimeRef.current = timeRemaining;
  }, [timeRemaining, isActive, isPaused]);

  // Calculate time warning class based on remaining time
  const getTimeClass = (): string => {
    if (!isActive) return '';
    
    if (timeRemaining <= 10) return 'time-critical';
    if (timeRemaining <= 30) return 'time-warning';
    return '';
  };

  // Handle exit button click
  const handleExitClick = () => {
    if (onExit) {
      onExit();
    }
  };

  return (
    <div className={`time-trial-timer-container ${isActive ? 'active' : ''} ${isPaused ? 'paused' : ''}`}>
      {onExit && (
        <button
          className="time-trial-exit-button"
          onClick={handleExitClick}
          title="Exit Time Trial"
          aria-label="Exit Time Trial"
        >
          X
        </button>
      )}
      
      <div className={`time-display ${getTimeClass()}`}>
        {formatTime(timeRemaining)}
      </div>
      
      {showTimeAddedAnimation && timeAdded && (
        <div className="time-added-animation">
          +{timeAdded}s
        </div>
      )}

      {isPaused && (
        <div className="paused-indicator">PAUSED</div>
      )}
    </div>
  );
};

export default TimeTrialTimer;