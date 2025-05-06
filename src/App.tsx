import { useState, useEffect } from 'react'
import './App.css'
import ClassicMode from './components/ClassicMode/ClassicMode'
import titleImageFull from './assets/PokemonCatcherTitleFull.png'

// Define available game modes
type GameMode = 'none' | 'classic' // We'll add more modes later

// Key for storing the selected mode in localStorage
const MODE_STORAGE_KEY = 'pokemonCatcherGameMode'

function App() {
  // Initialize state from localStorage if available, otherwise default to 'none'
  const [currentMode, setCurrentMode] = useState<GameMode>(() => {
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as GameMode | null
    return savedMode || 'classic'
  })

  // Save mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(MODE_STORAGE_KEY, currentMode)
  }, [currentMode])

  const handleBackToModeSelection = () => {
    setCurrentMode('none')
  }

  const handleSelectMode = (mode: GameMode) => {
    setCurrentMode(mode)
  }

  const renderModeSelector = () => {
    return (
      <div className="mode-selector">
        <div className="title-container">
          <img src={titleImageFull} alt="Pokemon Catcher Title" className="title-image" />
        </div>
        <h2>Select Game Mode</h2>
        <div className="mode-buttons">
          <button
            className="mode-button classic-button"
            onClick={() => handleSelectMode('classic')}
          >
            Classic Mode
          </button>
          {/* More mode buttons will be added here in the future */}
        </div>
      </div>
    )
  }

  const renderSelectedMode = () => {
    switch (currentMode) {
      case 'classic':
        return <ClassicMode onBackToModeSelection={handleBackToModeSelection} />
      default:
        return renderModeSelector()
    }
  }

  return (
    <div className="app">
      {renderSelectedMode()}
    </div>
  )
}

export default App