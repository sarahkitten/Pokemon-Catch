import { useState, useEffect, useRef } from 'react'
import './DailyChallengeMode.css'
import { SearchForm } from '../SearchForm/SearchForm'
import { GameControls } from '../GameControls/GameControls'
import { PokemonList } from '../PokemonList/PokemonList'
import { ConfirmDialog } from '../Dialog/ConfirmDialog'
import PokemonConfetti from '../../PokemonConfetti'
import { useGameState } from '../../hooks/useGameState'
import { useNextChallengeCountdown } from '../../hooks/useNextChallengeCountdown'
import { getDailyChallengeStats, markDailyChallengeCompleted, getTodayPacific, type DailyChallengeStats } from '../../utils/dailyChallengeUtils'
import { getFilteredTitle } from '../../utils/pokemonUtils'
import { submitPokemonGuess, revealRemainingPokemon } from '../../utils/pokemonStateUtils'
import titleImageFull from '../../assets/PokemonCatcherTitleFull.png'
import ashImage from '../../assets/ash.png'
import filterCombinations from '../../data/filterCombinations.json'
import { GENERATIONS, POKEMON_TYPES } from '../../constants'

interface DialogConfig {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

interface FilterCombination {
  generation: string;
  type: string;
  letter: string;
  count: number;
}

interface DailyChallengeModeProps {
  onBackToModeSelection: () => void;
}

// Seeded random function for deterministic "randomness"
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Get daily challenge based on current date (same for all users)
const getDailyChallenge = (date: Date): FilterCombination | null => {
  // Create a seed from the date (YYYYMMDD format)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${year}${month}${day}`;
  const seed = parseInt(dateString);
  
  // Use seed to pick category (6-20 or 21-50)
  const categories = ['6-20', '21-50'] as const;
  const categoryIndex = Math.floor(seededRandom(seed) * categories.length);
  const selectedCategory = categories[categoryIndex];
  
  const combinations = filterCombinations[selectedCategory] as FilterCombination[];
  
  if (!combinations || combinations.length === 0) {
    return null;
  }
  
  // Use a different seed variation to pick the specific combination
  const combIndex = Math.floor(seededRandom(seed + 1000) * combinations.length);
  
  return combinations[combIndex];
};

// Updated function to get today's daily challenge with localStorage persistence
const getDailyChallengeFilterCombination = (): FilterCombination | null => {
  const today = getTodayPacific();
  const todayString = today.toISOString().slice(0, 10); // "2025-07-01"
  
  // Check if we already have today's challenge stored
  const storedDate = localStorage.getItem('dailyChallengeDate');
  const storedChallenge = localStorage.getItem('dailyChallenge');
  
  if (storedDate === todayString && storedChallenge) {
    try {
      return JSON.parse(storedChallenge);
    } catch (e) {
      console.error('Failed to parse stored challenge:', e);
    }
  }
  
  // Generate new challenge for today
  const challenge = getDailyChallenge(today);
  
  if (challenge) {
    // Store today's challenge
    localStorage.setItem('dailyChallengeDate', todayString);
    localStorage.setItem('dailyChallenge', JSON.stringify(challenge));
  }
  
  return challenge;
};

// Trainer progression system
const getTrainerRank = (caught: number, total: number): { rank: string; nextRank: string | null } => {
  const percentage = total > 0 ? (caught / total) * 100 : 0;
  
  if (percentage >= 100) return { rank: 'Professor', nextRank: null };
  if (percentage >= 80) return { rank: 'Champion', nextRank: 'Professor' };
  if (percentage >= 60) return { rank: 'Gym Leader', nextRank: 'Champion' };
  if (percentage >= 40) return { rank: 'Trainer', nextRank: 'Gym Leader' };
  if (percentage >= 20) return { rank: 'Youngster', nextRank: 'Trainer' };
  
  return { rank: 'Rookie', nextRank: 'Youngster' };
};

export const DailyChallengeMode = ({ onBackToModeSelection }: DailyChallengeModeProps) => {
  const gameState = useGameState('dailychallenge');
  const { timeLeft, formatTime } = useNextChallengeCountdown();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentDate, setCurrentDate] = useState<string>('')
  const [challengeFilters, setChallengeFilters] = useState<FilterCombination | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyChallengeStats>(getDailyChallengeStats());
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    // Get current date in a readable format
    const today = new Date()
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    setCurrentDate(dateStr)
  }, [])

  // Initialize the daily challenge with random filters
  useEffect(() => {
    if (!isInitialized) {
      const filters = getDailyChallengeFilterCombination();
      if (filters) {
        setChallengeFilters(filters);
        
        // Apply the filters to the game state
        const generationIndex = GENERATIONS.findIndex(gen => gen.name === filters.generation);
        const typeIndex = POKEMON_TYPES.findIndex(type => type === filters.type);
        
        if (generationIndex !== -1 && typeIndex !== -1) {
          // Check if this is a new challenge (different filters than current state)
          const isNewChallenge = 
            gameState.selectedGenerationIndex !== generationIndex ||
            gameState.selectedType !== filters.type ||
            gameState.selectedLetter !== filters.letter;
          
          gameState.setSelectedGenerationIndex(generationIndex);
          gameState.setSelectedType(filters.type);
          gameState.setSelectedLetter(filters.letter);
          
          // Only reset progress if this is a new challenge
          if (isNewChallenge) {
            gameState.resetProgress();
          }
          
          gameState.updateTotalCount(GENERATIONS[generationIndex], filters.type, filters.letter);
        }
        
        setIsInitialized(true);
      }
    }
  }, [isInitialized, gameState]);

  // Update background effect when all Pokemon are caught
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      if (gameState.allCaught) {
        rootElement.classList.add('all-caught');
      } else {
        rootElement.classList.remove('all-caught');
      }
    }
  }, [gameState.allCaught]);

  // Handle daily challenge completion
  useEffect(() => {
    if (gameState.allCaught && isInitialized) {
      const today = getTodayPacific().toISOString().slice(0, 10);
      const currentStats = getDailyChallengeStats();
      
      // Only mark as completed if not already completed today
      if (!currentStats.completedDates.includes(today)) {
        const newStats = markDailyChallengeCompleted();
        setDailyStats(newStats);
      }
    }
  }, [gameState.allCaught, isInitialized]);

  // Check if today's challenge is completed
  const todayCompleted = (() => {
    const today = getTodayPacific().toISOString().slice(0, 10);
    return dailyStats.completedDates.includes(today);
  })();

  const showConfirmDialog = (message: string, onConfirm: () => void) => {
    setDialogConfig({
      isOpen: true,
      message,
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleStartOver = () => {
    if (gameState.caughtPokemon.length === 0 && gameState.revealedPokemon.length === 0) return;
    
    // Skip confirmation if game is already completed (all caught or gave up)
    if (gameState.allCaught || gameState.revealedPokemon.length > 0) {
      gameState.resetProgress();
      return;
    }

    showConfirmDialog(
      "Are you sure you want to start over? This will reset your progress.",
      () => {
        gameState.resetProgress();
        closeDialog();
      }
    );
  };

  const handleGiveUp = async () => {
    if (gameState.allCaught) return;
    
    showConfirmDialog(
      "Are you sure you want to give up? This will reveal all remaining Pokémon.",
      async () => {
        await revealRemainingPokemon(gameState, closeDialog);
      }
    );
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPokemonGuess(gameState, inputRef);
  };

  const handleReset = () => {
    // Reset only the progress, keeping the daily challenge filters
    gameState.resetProgress();
  };

  if (!isInitialized || !challengeFilters) {
    return (
      <div className="daily-challenge-mode">
        <div className="main-content">
          <div className="title-container clickable" onClick={onBackToModeSelection}>
            <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
          </div>
          <div className="loading-container">
            <p>Loading Daily Challenge...</p>
          </div>
        </div>
      </div>
    );
  }

  const title = getFilteredTitle(gameState);

  return (
    <div className="daily-challenge-mode">
      <div className="main-content">
        <div className="title-container clickable" onClick={onBackToModeSelection}>
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
          <div className="mode-label daily-challenge-label">Daily Challenge</div>
        </div>
        
        <div className="nes-container">
          <h3 className="daily-challenge-title" dangerouslySetInnerHTML={{ __html: title }}></h3>
          
          <div className="trainer-progress">
            <div className="progress-header">
              <div className="trainer-rank">
                <span className="rank-label">{getTrainerRank(gameState.caughtPokemon.length, gameState.totalPokemon).rank}</span>
                {getTrainerRank(gameState.caughtPokemon.length, gameState.totalPokemon).nextRank && (
                  <span className="next-rank">→ {getTrainerRank(gameState.caughtPokemon.length, gameState.totalPokemon).nextRank}</span>
                )}
              </div>
              <div className="progress-stats">
                <span className="caught-count">{gameState.caughtPokemon.length}</span>
                <span className="total-count">/ {gameState.totalPokemon}</span>
              </div>
            </div>
            
            <div className="progress-bar-container" onClick={() => setDialogConfig({
              isOpen: true,
              message: `Trainer Rank Requirements:\n\n• Rookie: 0 - ${Math.floor(gameState.totalPokemon * 0.19)} Pokemon\n• Youngster: ${Math.floor(gameState.totalPokemon * 0.20)} - ${Math.floor(gameState.totalPokemon * 0.39)} Pokemon\n• Trainer: ${Math.floor(gameState.totalPokemon * 0.40)} - ${Math.floor(gameState.totalPokemon * 0.59)} Pokemon\n• Gym Leader: ${Math.floor(gameState.totalPokemon * 0.60)} - ${Math.floor(gameState.totalPokemon * 0.79)} Pokemon\n• Champion: ${Math.floor(gameState.totalPokemon * 0.80)} - ${Math.floor(gameState.totalPokemon * 0.99)} Pokemon\n• Professor: ${gameState.totalPokemon} Pokemon (100%)`,
              onConfirm: closeDialog
            })}>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${gameState.totalPokemon > 0 ? (gameState.caughtPokemon.length / gameState.totalPokemon) * 100 : 0}%` 
                  }}
                ></div>
                
                {/* Rank indicators - vertical ticks only */}
                <div className="rank-indicators">
                  <div className="rank-marker" style={{ left: '20%' }} title="Youngster (20%)">
                    <div className="rank-tick"></div>
                  </div>
                  <div className="rank-marker" style={{ left: '40%' }} title="Trainer (40%)">
                    <div className="rank-tick"></div>
                  </div>
                  <div className="rank-marker" style={{ left: '60%' }} title="Gym Leader (60%)">
                    <div className="rank-tick"></div>
                  </div>
                  <div className="rank-marker" style={{ left: '80%' }} title="Champion (80%)">
                    <div className="rank-tick"></div>
                  </div>
                </div>
                
                <div 
                  className="ash-icon" 
                  style={{ 
                    left: `${gameState.totalPokemon > 0 ? (gameState.caughtPokemon.length / gameState.totalPokemon) * 100 : 0}%` 
                  }}
                >
                  <img src={ashImage} alt="Ash" className="ash-image" />
                </div>
              </div>
            </div>
            
            {/* Next rank progress indicator */}
            {getTrainerRank(gameState.caughtPokemon.length, gameState.totalPokemon).nextRank && (
              <div className="next-rank-progress">
                {(() => {
                  const currentRank = getTrainerRank(gameState.caughtPokemon.length, gameState.totalPokemon);
                  const nextRankThresholds = [
                    { rank: 'Youngster', threshold: 0.20 },
                    { rank: 'Trainer', threshold: 0.40 },
                    { rank: 'Gym Leader', threshold: 0.60 },
                    { rank: 'Champion', threshold: 0.80 },
                    { rank: 'Professor', threshold: 1.00 }
                  ];
                  
                  const nextThreshold = nextRankThresholds.find(t => t.rank === currentRank.nextRank);
                  if (nextThreshold) {
                    const pokemonNeeded = Math.ceil(gameState.totalPokemon * nextThreshold.threshold) - gameState.caughtPokemon.length;
                    return (
                      <p className="progress-text">
                        {pokemonNeeded} more Pokemon to reach <strong>{currentRank.nextRank}</strong>
                      </p>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
            
            <div className="challenge-summary">
              <div className="challenge-date-compact">
                <span className="date-compact">
                  {currentDate}
                </span>
                <div className="countdown-container">
                  <span className="countdown-label">Next Challenge:</span>
                  <span className="countdown-time">{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <div className="daily-stats">
                <div className="stat-item">
                  <span className="stat-value">{dailyStats.currentStreak}</span>
                  <span className="stat-label">Current Streak</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{dailyStats.totalCompleted}</span>
                  <span className="stat-label">Total Completed</span>
                </div>
                {dailyStats.longestStreak > dailyStats.currentStreak && (
                  <div className="stat-item">
                    <span className="stat-value">{dailyStats.longestStreak}</span>
                    <span className="stat-label">Best Streak</span>
                  </div>
                )}
              </div>
              
              {todayCompleted && !gameState.allCaught && (
                <div className="completion-badge">
                  <span className="completion-text">✅ Today's Challenge Complete!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pokemon-section">
          <SearchForm 
            gameState={gameState}
            onSubmit={handleInputSubmit}
            inputRef={inputRef}
            isDailyChallenge={true}
          />
          
          <GameControls
            gameState={gameState}
            onStartOver={handleStartOver}
            onGiveUp={handleGiveUp}
            hideStartOver={true}
            inputRef={inputRef}
            onReset={handleReset}
          />
          
          <PokemonList
            caughtPokemon={gameState.caughtPokemon}
            revealedPokemon={gameState.revealedPokemon}
            filteredPokemon={gameState.filteredPokemon}
            isMuted={gameState.isMuted}
            allCaught={gameState.allCaught}
          />
        </div>
      </div>

      {/* Regular confetti for catching a Pokemon */}
      {gameState.confettiProps && (
        <PokemonConfetti
          spriteUrl={gameState.confettiProps.sprite}
          inputPosition={gameState.confettiProps.position}
        />
      )}
      {/* Continuous confetti when all Pokemon are caught */}
      {gameState.allCaught && (
        <PokemonConfetti
          caughtSprites={gameState.caughtPokemon.map(p => p.sprite)}
          isContinuous={true}
        />
      )}

      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  )
}

export default DailyChallengeMode
