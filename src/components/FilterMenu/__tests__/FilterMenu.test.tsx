import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterMenu } from '../FilterMenu';
import { createMockGameState } from '../../../test/testUtils';
import type { GameState } from '../../../hooks/useGameState';

describe('FilterMenu', () => {
  const mockGameState = createMockGameState();
  const defaultProps = {
    gameState: mockGameState,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test('handles generation filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    fireEvent.change(select, { target: { value: '1' } });
    expect(mockGameState.changeGeneration).toHaveBeenCalledWith(1);
  });

  test('handles type filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
    const select = screen.getByLabelText(/choose pokemon type/i);
    
    fireEvent.change(select, { target: { value: 'Fire' } });
    expect(mockGameState.changeType).toHaveBeenCalledWith('Fire');
  });

  test('handles letter filter change', async () => {
    render(<FilterMenu {...defaultProps} />);
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
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithCaught} />);
    const select = screen.getByLabelText(/choose your region/i);
    
    fireEvent.change(select, { target: { value: '1' } });
    expect(window.confirm).toHaveBeenCalled();
  });

  test('handles randomize buttons', () => {
    render(<FilterMenu {...defaultProps} />);
    
    const randomizeButtons = screen.getAllByAltText('Random');
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
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithFilters} />);
    
    const resetButtons = screen.getAllByAltText('Reset');
    fireEvent.click(resetButtons[0]); // Generation reset
    expect(mockGameState.resetGeneration).toHaveBeenCalled();
    
    fireEvent.click(resetButtons[1]); // Type reset
    expect(mockGameState.resetType).toHaveBeenCalled();
    
    fireEvent.click(resetButtons[2]); // Letter reset
    expect(mockGameState.resetLetter).toHaveBeenCalled();
  });

  test('handles easy mode toggle', () => {
    render(<FilterMenu {...defaultProps} />);
    const checkbox = screen.getByLabelText(/easy mode/i);
    
    fireEvent.click(checkbox);
    expect(mockGameState.setIsEasyMode).toHaveBeenCalledWith(true);
  });

  test('handles randomize all filters', () => {
    render(<FilterMenu {...defaultProps} />);
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
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithFilters} />);
    const resetAllButton = screen.getByText(/reset all filters/i);
    
    fireEvent.click(resetAllButton);
    expect(mockGameState.resetAllFilters).toHaveBeenCalled();
  });

  test('disables randomize buttons when no valid options', () => {
    const mockGetValidOptions = jest.fn<GameState['getValidOptions']>().mockReturnValue(['option1']);
    const gameStateNoOptions = createMockGameState({
      getValidOptions: mockGetValidOptions
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateNoOptions} />);
    
    // Get the specific filter row buttons directly
    const randomizeButtons = screen.getAllByRole('button', { name: /Random/i });
    
    // Filter out the "Randomize Filters" button which might not be disabled
    const filterRowButtons = randomizeButtons.filter(button => 
      button.classList.contains('randomize-filter')
    );
    
    filterRowButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});