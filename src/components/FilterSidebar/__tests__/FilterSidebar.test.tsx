import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSidebar } from '../FilterSidebar';
import { createMockGameState } from '../../../test/testUtils';
import type { GameState } from '../../../hooks/useGameState';

describe('FilterSidebar', () => {
  const mockGameState = createMockGameState();

  const defaultProps = {
    gameState: mockGameState,
    isSidebarCollapsed: false,
    isSmallScreen: false,
    onToggleSidebar: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test('renders all filter sections', () => {
    render(<FilterSidebar {...defaultProps} />);
    
    expect(screen.getByLabelText(/choose your region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose pokemon type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first letter must be/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/easy mode/i)).toBeInTheDocument();
  });

  test('handles sidebar collapse/expand', () => {
    render(<FilterSidebar {...defaultProps} />);
    const toggleButton = screen.getByTitle(/collapse sidebar/i);
    
    fireEvent.click(toggleButton);
    expect(defaultProps.onToggleSidebar).toHaveBeenCalled();
  });

  test('renders correct toggle button based on screen size', () => {
    const { rerender } = render(<FilterSidebar {...defaultProps} />);
    expect(screen.getByText('◀')).toBeInTheDocument();

    rerender(<FilterSidebar {...defaultProps} isSmallScreen={true} />);
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  test('handles generation filter change', async () => {
    render(<FilterSidebar {...defaultProps} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    fireEvent.change(select, { target: { value: '1' } });
    expect(mockGameState.changeGeneration).toHaveBeenCalledWith(1);
  });

  test('handles type filter change', async () => {
    render(<FilterSidebar {...defaultProps} />);
    const select = screen.getByLabelText(/choose pokemon type/i);
    
    fireEvent.change(select, { target: { value: 'Fire' } });
    expect(mockGameState.changeType).toHaveBeenCalledWith('Fire');
  });

  test('handles letter filter change', async () => {
    render(<FilterSidebar {...defaultProps} />);
    const select = screen.getByLabelText(/first letter must be/i);
    
    fireEvent.change(select, { target: { value: 'A' } });
    expect(mockGameState.changeLetter).toHaveBeenCalledWith('A');
  });

  test('confirms before changing filters when Pokemon are caught', () => {
    const gameStateWithCaught = createMockGameState({
      caughtPokemon: [{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]
    });
    
    render(<FilterSidebar {...defaultProps} gameState={gameStateWithCaught} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    fireEvent.change(select, { target: { value: '1' } });
    expect(window.confirm).toHaveBeenCalled();
  });

  test('handles randomize buttons', () => {
    render(<FilterSidebar {...defaultProps} />);
    
    const randomizeButtons = screen.getAllByText('🎲');
    fireEvent.click(randomizeButtons[0]); // Generation randomize
    expect(mockGameState.randomizeGeneration).toHaveBeenCalled();
    
    fireEvent.click(randomizeButtons[1]); // Type randomize
    expect(mockGameState.randomizeType).toHaveBeenCalled();
    
    fireEvent.click(randomizeButtons[2]); // Letter randomize
    expect(mockGameState.randomizeLetter).toHaveBeenCalled();
  });

  test('handles reset buttons', () => {
    const gameStateWithFilters = createMockGameState({
      selectedGenerationIndex: 1,
      selectedType: 'Fire',
      selectedLetter: 'B',
      resetGeneration: mockGameState.resetGeneration,
      resetType: mockGameState.resetType,
      resetLetter: mockGameState.resetLetter
    });
    
    render(<FilterSidebar {...defaultProps} gameState={gameStateWithFilters} />);
    
    const resetButtons = screen.getAllByText('↺');
    fireEvent.click(resetButtons[0]); // Generation reset
    expect(mockGameState.resetGeneration).toHaveBeenCalled();
    
    fireEvent.click(resetButtons[1]); // Type reset
    expect(mockGameState.resetType).toHaveBeenCalled();
    
    fireEvent.click(resetButtons[2]); // Letter reset
    expect(mockGameState.resetLetter).toHaveBeenCalled();
  });

  test('handles easy mode toggle', () => {
    render(<FilterSidebar {...defaultProps} />);
    const checkbox = screen.getByLabelText(/easy mode/i);
    
    fireEvent.click(checkbox);
    expect(mockGameState.setIsEasyMode).toHaveBeenCalledWith(true);
  });

  test('handles randomize all filters', () => {
    render(<FilterSidebar {...defaultProps} />);
    const randomizeAllButton = screen.getByTitle('Randomly set all filters');
    
    fireEvent.click(randomizeAllButton);
    expect(mockGameState.randomizeAllFilters).toHaveBeenCalled();
  });

  test('handles reset all filters', () => {
    const gameStateWithFilters = createMockGameState({
      selectedGenerationIndex: 1,
      selectedType: 'Fire',
      selectedLetter: 'B',
      resetAllFilters: mockGameState.resetAllFilters
    });
    
    render(<FilterSidebar {...defaultProps} gameState={gameStateWithFilters} />);
    const resetAllButton = screen.getByText(/reset all filters/i);
    
    fireEvent.click(resetAllButton);
    expect(mockGameState.resetAllFilters).toHaveBeenCalled();
  });

  test('disables randomize buttons when no valid options', () => {
    const mockGetValidOptions = jest.fn<GameState['getValidOptions']>().mockReturnValue(['option1']);
    const gameStateNoOptions = createMockGameState({
      getValidOptions: mockGetValidOptions
    });
    
    render(<FilterSidebar {...defaultProps} gameState={gameStateNoOptions} />);
    const randomizeButtons = screen.getAllByText('🎲');
    
    randomizeButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});