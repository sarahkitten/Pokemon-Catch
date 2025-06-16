import { useEffect, useState } from 'react';
import { formatTime } from '../../hooks/useTimeTrialTimer';
import type { GameState } from '../../hooks/useGameState';
import type { TimeTrialDifficulty, PokemonCountCategory, TimeTrialShareParams, PokemonData, CaughtPokemon, Pokemon } from '../../types';
import { encodeTimeTrialChallenge, copyToClipboard } from '../../utils/timeTrialUtils';
import { PokemonList } from '../PokemonList/PokemonList';
import { revealRemainingPokemon } from '../../utils/pokemonStateUtils';
import ultraballIcon from '../../assets/ultraball.svg';
import xIcon from '../../assets/x.png';
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
  challengeParams?: TimeTrialShareParams | null; // For sharing the exact same challenge
  onTryAgain: () => void;
  onChangeSettings: () => void;
  onHome: () => void;
  // New props for revealing Pokemon
  caughtPokemon: CaughtPokemon[];
  filteredPokemon: PokemonData[];
  isMuted: boolean;
}

export const TimeTrialResults = ({
  isVisible,
  caughtCount,
  totalPokemon,
  elapsedTime,
  settings,
  challengeParams,
  onTryAgain,
  onChangeSettings,
  onHome,
  caughtPokemon,
  filteredPokemon,
  isMuted
}: TimeTrialResultsProps) => {
  const [shareMessage, setShareMessage] = useState<string>('');
  const [showPokemonDialog, setShowPokemonDialog] = useState<boolean>(false);
  const [revealedPokemon, setRevealedPokemon] = useState<Pokemon[]>([]);
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

  // Handler for revealing all Pokemon
  const handleRevealPokemon = async () => {
    if (revealedPokemon.length === 0) {
      // Create a mock gameState object with the necessary properties
      const mockGameState: Pick<
        GameState, 
        'filteredPokemon' | 'caughtPokemon' | 'setIsGivingUp' | 'setError' | 'setInputValue' | 'setRevealedPokemon'
      > = {
        filteredPokemon,
        caughtPokemon,
        setIsGivingUp: () => {},
        setError: () => {},
        setInputValue: () => {},
        setRevealedPokemon: (revealed: Pokemon[]) => setRevealedPokemon(revealed)
      };
      
      await revealRemainingPokemon(mockGameState as GameState, () => {});
    }
    setShowPokemonDialog(true);
  };

  // Handler for sharing the challenge
  const handleShare = async () => {
    if (!challengeParams || !settings) {
      setShareMessage('Cannot share - challenge data unavailable');
      setTimeout(() => setShareMessage(''), 3000);
      return;
    }

    const shareParams: TimeTrialShareParams = {
      difficulty: settings.difficulty,
      pokemonCountCategory: settings.pokemonCountCategory,
      easyMode: settings.isEasyMode,
      generationIndex: challengeParams.generationIndex,
      type: challengeParams.type,
      letter: challengeParams.letter
    };

    const shareUrl = encodeTimeTrialChallenge(shareParams);
    const success = await copyToClipboard(shareUrl);
    
    if (success) {
      setShareMessage('Challenge URL copied to clipboard!');
    } else {
      setShareMessage('Failed to copy URL');
    }
    
    setTimeout(() => setShareMessage(''), 3000);
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
        
        {/* Share Message */}
        {shareMessage && (
          <p className={`time-trial-results-share-message ${shareMessage.includes('copied') ? 'success' : 'error'}`}>
            {shareMessage}
          </p>
        )}
        
        {/* Action buttons */}
        <div className="time-trial-results-actions">
          <button className="nes-btn is-success" onClick={onTryAgain}>
            Try Again
          </button>
          <button className="nes-btn is-primary" onClick={handleRevealPokemon}>
            👁️ Reveal All
          </button>
          {challengeParams && (
            <button className="nes-btn is-primary" onClick={handleShare}>
              📋 Share
            </button>
          )}
          <button className="nes-btn is-primary" onClick={onChangeSettings}>
            Settings
          </button>
          <button className="nes-btn is-warning" onClick={onHome}>
            Home
          </button>
        </div>
      </div>
      
      {/* Pokemon Reveal Dialog */}
      {showPokemonDialog && (
        <div className="dialog-overlay" style={{ zIndex: 1002 }}>
          <div className="nes-dialog is-rounded pokemon-reveal-dialog">
            <div className="pokemon-reveal-header">
              <p className="title">All Pokemon</p>
              <button 
                className="nes-btn is-error pokemon-reveal-close" 
                onClick={() => setShowPokemonDialog(false)}
                aria-label="Close"
              >
                <img src={xIcon} alt="Close" className="close-icon" />
              </button>
            </div>
            
            <PokemonList
              caughtPokemon={caughtPokemon}
              revealedPokemon={revealedPokemon}
              filteredPokemon={filteredPokemon}
              isMuted={isMuted}
              allCaught={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTrialResults;