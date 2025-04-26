import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FilterMenu } from '../FilterMenu';
import { createMockGameState } from '../../../test/testUtils';
import type { GameState } from '../../../hooks/useGameState';

describe('FilterMenu', () => {
  const mockGameState = createMockGameState();
  
  const defaultProps = {
    gameState: mockGameState,
    isSidebarCollapsed: false,
    isSmallScreen: false,
    onToggleSidebar: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles generation filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    await act(async () => {
      fireEvent.change(select, { target: { value: '1' } });
    });
    expect(mockGameState.changeGeneration).toHaveBeenCalledWith(1);
  });

  test('handles type filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
    const select = screen.getByLabelText(/choose pokemon type/i);
    
    await act(async () => {
      fireEvent.change(select, { target: { value: 'Fire' } });
    });
    expect(mockGameState.changeType).toHaveBeenCalledWith('Fire');
  });

  test('handles letter filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
    const select = screen.getByLabelText(/first letter must be/i);
    
    await act(async () => {
      fireEvent.change(select, { target: { value: 'A' } });
    });
    expect(mockGameState.changeLetter).toHaveBeenCalledWith('A');
  });

  test('shows confirmation dialog before changing filters when Pokemon are caught', async () => {
    const gameStateWithCaught = createMockGameState({
      caughtPokemon: [{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithCaught} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    await act(async () => {
      fireEvent.change(select, { target: { value: '1' } });
    });
    
    // Check for dialog
    const dialogElement = screen.getByText(/changing generations will reset your current progress/i);
    expect(dialogElement).toBeInTheDocument();
    
    // Confirm dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Confirm'));
    });
    
    expect(gameStateWithCaught.changeGeneration).toHaveBeenCalledWith(1);
  });

  test('cancels filter change when dialog is canceled', async () => {
    const gameStateWithCaught = createMockGameState({
      caughtPokemon: [{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithCaught} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    await act(async () => {
      fireEvent.change(select, { target: { value: '1' } });
    });
    
    // Check for dialog
    expect(screen.getByText(/changing generations will reset your current progress/i)).toBeInTheDocument();
    
    // Cancel dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });
    
    expect(gameStateWithCaught.changeGeneration).not.toHaveBeenCalled();
  });

  test('handles randomize buttons', async () => {
    render(<FilterMenu {...defaultProps} />);
    
    const randomizeButtons = screen.getAllByAltText('Random');
    await act(async () => {
      fireEvent.click(randomizeButtons[0]); // Generation randomize
    });
    expect(mockGameState.randomizeGeneration).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.click(randomizeButtons[1]); // Type randomize
    });
    expect(mockGameState.randomizeType).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.click(randomizeButtons[2]); // Letter randomize
    });
    expect(mockGameState.randomizeLetter).toHaveBeenCalled();
  });

  test('handles reset buttons', async () => {
    const gameStateWithFilters = createMockGameState({
      selectedGenerationIndex: 1,
      selectedType: 'Fire',
      selectedLetter: 'B',
      resetGeneration: mockGameState.resetGeneration,
      resetType: mockGameState.resetType,
      resetLetter: mockGameState.resetLetter
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithFilters} />);
    
    const resetButtons = screen.getAllByAltText('Reset');
    await act(async () => {
      fireEvent.click(resetButtons[0]); // Generation reset
    });
    expect(mockGameState.resetGeneration).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.click(resetButtons[1]); // Type reset
    });
    expect(mockGameState.resetType).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.click(resetButtons[2]); // Letter reset
    });
    expect(mockGameState.resetLetter).toHaveBeenCalled();
  });

  test('handles randomize all filters', async () => {
    render(<FilterMenu {...defaultProps} />);
    const randomizeAllButton = screen.getByTitle('Randomly set all filters');
    
    await act(async () => {
      fireEvent.click(randomizeAllButton);
    });
    expect(mockGameState.randomizeAllFilters).toHaveBeenCalled();
  });

  test('handles reset all filters', async () => {
    const gameStateWithFilters = createMockGameState({
      selectedGenerationIndex: 1,
      selectedType: 'Fire',
      selectedLetter: 'B',
      resetAllFilters: mockGameState.resetAllFilters
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithFilters} />);
    const resetAllButton = screen.getByText(/reset all filters/i);
    
    await act(async () => {
      fireEvent.click(resetAllButton);
    });
    expect(mockGameState.resetAllFilters).toHaveBeenCalled();
  });

  test('disables randomize buttons when no valid options', () => {
    const mockGetValidOptions = jest.fn<GameState['getValidOptions']>().mockReturnValue(['option1']);
    const gameStateNoOptions = createMockGameState({
      getValidOptions: mockGetValidOptions
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateNoOptions} />);
    
    const randomizeButtons = screen.getAllByRole('button', { name: /Random/i });
    
    const filterRowButtons = randomizeButtons.filter(button => 
      button.classList.contains('randomize-filter')
    );
    
    filterRowButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  test('handles collapsed sidebar', async () => {
    render(<FilterMenu {...defaultProps} isSidebarCollapsed={true} />);
    
    const toggleButton = screen.getByTitle('Open Filter Menu');
    expect(toggleButton).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(defaultProps.onToggleSidebar).toHaveBeenCalled();
  });
});