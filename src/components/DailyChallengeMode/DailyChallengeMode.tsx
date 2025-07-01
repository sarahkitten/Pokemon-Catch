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
          
          <div className="challenge-criteria">
            <h3>Today's Challenge Criteria:</h3>
            <div className="criteria-grid">
              <div className="criteria-item">
                <span className="criteria-label">Generation:</span>
                <span className="criteria-value">{challengeFilters.generation}</span>
              </div>
              <div className="criteria-item">
                <span className="criteria-label">Type:</span>
                <span className="criteria-value">{challengeFilters.type}</span>
              </div>
              <div className="criteria-item">
                <span className="criteria-label">Letter:</span>
                <span className="criteria-value">{challengeFilters.letter}</span>
              </div>
              <div className="criteria-item">
                <span className="criteria-label">Total Pokemon:</span>
                <span className="criteria-value">{challengeFilters.count}</span>
              </div>
            </div>
            
            <button 
              className="new-challenge-button"
              onClick={handleNewChallenge}
            >
              🎲 Generate New Challenge
            </button>
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
