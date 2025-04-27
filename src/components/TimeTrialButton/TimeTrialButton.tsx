import './TimeTrialButton.css';
import stopwatchIcon from '../../assets/ultraball.svg';

interface TimeTrialButtonProps {
  onStartTimeTrial: () => void;
  className?: string;
}

export function TimeTrialButton({ onStartTimeTrial, className = '' }: TimeTrialButtonProps) {
  // This will be expanded later with more functionality as needed
  return (
    <div className={`time-trial-button-container ${className}`}>
      <button 
        className="time-trial-button nes-btn is-warning" 
        onClick={onStartTimeTrial}
        title="Start Time Trial Challenge"
      >
        <img src={stopwatchIcon} alt="Time Trial" className="icon-image" /> Time Trial
      </button>
    </div>
  );
}