import { useState, useEffect } from 'react'
import './App.css'
import ClassicMode from './components/ClassicMode/ClassicMode'
import TimeTrialMode from './components/TimeTrialMode/TimeTrialMode'
import DailyChallengeMode from './components/DailyChallengeMode/DailyChallengeMode'
import { hasSharedChallenge } from './utils/timeTrialUtils'
import { getDailyChallengeStats } from './utils/dailyChallengeUtils'
import titleImageFull from './assets/PokemonCatcherTitleFull.png'
import fireIcon from './assets/fire.ico'

// Define available game modes
type GameMode = 'none' | 'classic' | 'timetrial' | 'dailychallenge'

// Key for storing the selected mode in localStorage
const MODE_STORAGE_KEY = 'pokemonCatcherGameMode'

function App() {
  // Initialize state from localStorage if available, otherwise default to 'none'
  const [currentMode, setCurrentMode] = useState<GameMode>(() => {
    // Check if there's a shared challenge in the URL
    if (hasSharedChallenge()) {
      return 'timetrial'
    }
    
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as GameMode | null
    return savedMode || 'classic'
  })

  // Check for shared challenges on mount and URL changes
  useEffect(() => {
    const checkForSharedChallenge = () => {
      if (hasSharedChallenge() && currentMode !== 'timetrial') {
        setCurrentMode('timetrial')
      }
    }

    // Check immediately
    checkForSharedChallenge()

    // Listen for URL changes (back/forward navigation)
    window.addEventListener('popstate', checkForSharedChallenge)
    
    return () => {
      window.removeEventListener('popstate', checkForSharedChallenge)
    }
  }, [currentMode])

  // Save mode to localStorage whenever it changes (but not for shared challenges)
  useEffect(() => {
    // Don't save 'timetrial' mode to localStorage if it was triggered by a shared challenge
    if (!hasSharedChallenge()) {
      localStorage.setItem(MODE_STORAGE_KEY, currentMode)
    }
  }, [currentMode])

  const handleBackToModeSelection = () => {
    setCurrentMode('none')
  }

  const handleSelectMode = (mode: GameMode) => {
    setCurrentMode(mode)
  }

  const renderModeSelector = () => {
    const dailyStats = getDailyChallengeStats();
    
    return (
      <div className="mode-selector">
        <div className="title-container">
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
        </div>
        <h2>Select Game Mode</h2>
        <div className="mode-buttons">
          <button
            className="mode-button daily-challenge-button"
            onClick={() => handleSelectMode('dailychallenge')}
          >
            <div className="button-content">
              <span className="button-text">Daily Challenge</span>
              {dailyStats.currentStreak > 0 && (
                <div className="streak-indicator">
                  <img src={fireIcon} alt="Streak" className="fire-icon" />
                  <span className="streak-number">{dailyStats.currentStreak}</span>
                </div>
              )}
            </div>
          </button>
          <button
            className="mode-button classic-button"
            onClick={() => handleSelectMode('classic')}
          >
            Classic Mode
          </button>
          <button
            className="mode-button timed-button"
            onClick={() => handleSelectMode('timetrial')}
          >
            Time Trial Mode
          </button>
        </div>
      </div>
    )
  }

  const renderSelectedMode = () => {
    switch (currentMode) {
      case 'classic':
        return <ClassicMode onBackToModeSelection={handleBackToModeSelection} />
      case 'timetrial':
        return <TimeTrialMode onBackToModeSelection={handleBackToModeSelection} />
      case 'dailychallenge':
        return <DailyChallengeMode onBackToModeSelection={handleBackToModeSelection} />
      default:
        return renderModeSelector()
    }
  }

  return (
    <div className={`app mode-${currentMode}`}>
      <div className="mode-container">
        {renderSelectedMode()}
      </div>
    </div>
  )
}

export default App