import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { FilterMenu } from '../FilterMenu';
import { createMockGameState } from '../../../test/testUtils';
import type { GameState } from '../../../hooks/useGameState';
import { POKEMON_TYPES } from '../../../constants';

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
  
  // Additional tests to improve coverage

  test('disables reset buttons when at default values', () => {
    const gameStateWithDefaultValues = createMockGameState({
      selectedGenerationIndex: 0,
      selectedType: POKEMON_TYPES[0],
      selectedLetter: 'All'
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithDefaultValues} />);
    
    // Check generation reset button
    const generationSection = screen.getByLabelText(/choose your region/i).closest('.generation-selector');
    const genResetButton = within(generationSection as HTMLElement).getByRole('button', { name: /reset/i });
    expect(genResetButton).toBeDisabled();
    expect(genResetButton).toHaveAttribute('title', 'Already at default');
    
    // Check type reset button
    const typeSection = screen.getByLabelText(/choose pokemon type/i).closest('.type-selector');
    const typeResetButton = within(typeSection as HTMLElement).getByRole('button', { name: /reset/i });
    expect(typeResetButton).toBeDisabled();
    expect(typeResetButton).toHaveAttribute('title', 'Already at default');
    
    // Check letter reset button
    const letterSection = screen.getByLabelText(/first letter must be/i).closest('.letter-selector');
    const letterResetButton = within(letterSection as HTMLElement).getByRole('button', { name: /reset/i });
    expect(letterResetButton).toBeDisabled();
    expect(letterResetButton).toHaveAttribute('title', 'Already at default');
    
    // Check reset all button
    const resetAllButton = screen.getByText(/reset all filters/i);
    expect(resetAllButton).toBeDisabled();
    expect(resetAllButton).toHaveAttribute(
      'title', 
      'All filters are already at default values'
    );
  });

  test('skips reset if already at default value', async () => {
    const gameStateWithDefaultValues = createMockGameState({
      selectedGenerationIndex: 0,
      selectedType: POKEMON_TYPES[0],
      selectedLetter: 'All',
      resetGeneration: jest.fn(),
      resetType: jest.fn(),
      resetLetter: jest.fn(),
      resetAllFilters: jest.fn()
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithDefaultValues} />);
    
    // Try to click on already disabled reset buttons
    const resetButtons = screen.getAllByAltText('Reset');
    await act(async () => {
      // These clicks should be effectively no-ops due to disabled state
      fireEvent.click(resetButtons[0]); // Generation reset
      fireEvent.click(resetButtons[1]); // Type reset
      fireEvent.click(resetButtons[2]); // Letter reset
    });
    
    // Functions should not have been called
    expect(gameStateWithDefaultValues.resetGeneration).not.toHaveBeenCalled();
    expect(gameStateWithDefaultValues.resetType).not.toHaveBeenCalled();
    expect(gameStateWithDefaultValues.resetLetter).not.toHaveBeenCalled();
    
    // Try reset all
    const resetAllButton = screen.getByText(/reset all filters/i);
    await act(async () => {
      fireEvent.click(resetAllButton);
    });
    
    expect(gameStateWithDefaultValues.resetAllFilters).not.toHaveBeenCalled();
  });

  test('shows confirmation dialog before resetting filters when Pokemon are caught', async () => {
    const gameStateWithCaught = createMockGameState({
      selectedGenerationIndex: 1,
      selectedType: 'Fire',
      selectedLetter: 'B',
      caughtPokemon: [{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithCaught} />);
    
    // Test reset generation
    const resetButtons = screen.getAllByAltText('Reset');
    await act(async () => {
      fireEvent.click(resetButtons[0]); // Generation reset
    });
    
    expect(screen.getByText(/resetting generation will reset your current progress/i)).toBeInTheDocument();
    
    // Confirm dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Confirm'));
    });
    
    expect(gameStateWithCaught.resetGeneration).toHaveBeenCalled();
  });

  test('shows confirmation dialog before randomizing all filters when Pokemon are caught', async () => {
    const gameStateWithCaught = createMockGameState({
      caughtPokemon: [{
        name: 'Pikachu',
        sprite: '/sprites/pikachu.png',
        types: ['Electric']
      }]
    });
    
    render(<FilterMenu {...defaultProps} gameState={gameStateWithCaught} />);
    
    const randomizeAllButton = screen.getByTitle('Randomly set all filters');
    await act(async () => {
      fireEvent.click(randomizeAllButton);
    });
    
    expect(screen.getByText(/randomizing all filters will reset your current progress/i)).toBeInTheDocument();
    
    // Confirm dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Confirm'));
    });
    
    expect(gameStateWithCaught.randomizeAllFilters).toHaveBeenCalled();
  });

  test('closes filter menu when close button is clicked', async () => {
    render(<FilterMenu {...defaultProps} />);
    
    const closeButton = screen.getByTitle('Close Filter Menu');
    await act(async () => {
      fireEvent.click(closeButton);
    });
    
    expect(defaultProps.onToggleSidebar).toHaveBeenCalled();
  });

  test('applies mobile class when on small screen', () => {
    render(<FilterMenu {...defaultProps} isSmallScreen={true} />);
    
    const menuContainer = screen.getByText('Filter Options').closest('.menu');
    expect(menuContainer).toHaveClass('mobile-menu');
  });
});