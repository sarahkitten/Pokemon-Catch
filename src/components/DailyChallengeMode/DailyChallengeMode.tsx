import { useState, useEffect, useRef } from 'react'
import './DailyChallengeMode.css'
import { SearchForm } from '../SearchForm/SearchForm'
import { GameControls } from '../GameControls/GameControls'
import { PokemonList } from '../PokemonList/PokemonList'
import { ConfirmDialog } from '../Dialog/ConfirmDialog'
import PokemonConfetti from '../../PokemonConfetti'
import { useGameState } from '../../hooks/useGameState'
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

// Function to get a random filter combination from the "6-20" or "21-50" categories
const getDailyChallengeFilterCombination = (): FilterCombination | null => {
  const categories = ['6-20', '21-50'] as const;
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  
  const combinations = filterCombinations[selectedCategory] as FilterCombination[];
  
  if (!combinations || combinations.length === 0) {
    return null;
  }
  
  return combinations[Math.floor(Math.random() * combinations.length)];
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
  const gameState = useGameState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentDate, setCurrentDate] = useState<string>('')
  const [challengeFilters, setChallengeFilters] = useState<FilterCombination | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
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
          gameState.setSelectedGenerationIndex(generationIndex);
          gameState.setSelectedType(filters.type);
          gameState.setSelectedLetter(filters.letter);
          gameState.resetProgress();
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
    if (gameState.allCaught || gameState.caughtPokemon.length === 0) return;
    
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

  const handleNewChallenge = () => {
    const filters = getDailyChallengeFilterCombination();
    if (filters) {
      setChallengeFilters(filters);
      
      // Apply the new filters to the game state
      const generationIndex = GENERATIONS.findIndex(gen => gen.name === filters.generation);
      const typeIndex = POKEMON_TYPES.findIndex(type => type === filters.type);
      
      if (generationIndex !== -1 && typeIndex !== -1) {
        gameState.setSelectedGenerationIndex(generationIndex);
        gameState.setSelectedType(filters.type);
        gameState.setSelectedLetter(filters.letter);
        gameState.resetProgress();
        gameState.updateTotalCount(GENERATIONS[generationIndex], filters.type, filters.letter);
      }
    }
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
        </div>
        
        <div className="challenge-info-card">
          <h1 className="mode-title">Daily Challenge</h1>
          <p className="challenge-date">{currentDate}</p>
          
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
            
            <div className="challenge-summary">
              <div className="challenge-criteria-compact">
                <span className="criteria-compact">
                  {challengeFilters.generation} • {challengeFilters.type} • Letter {challengeFilters.letter}
                </span>
              </div>
              <button 
                className="new-challenge-button-compact"
                onClick={handleNewChallenge}
                title="Generate New Challenge"
              >
                🎲
              </button>
            </div>
          </div>
        </div>

        <div className="pokemon-section">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }}></h2>
          
          <SearchForm 
            gameState={gameState}
            onSubmit={handleInputSubmit}
            inputRef={inputRef}
          />
          
          <GameControls
            gameState={gameState}
            onStartOver={handleStartOver}
            onGiveUp={handleGiveUp}
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
