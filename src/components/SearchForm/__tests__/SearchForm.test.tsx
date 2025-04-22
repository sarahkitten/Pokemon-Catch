import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';
import { createMockGameState } from '../../../test/testUtils';

describe('SearchForm', () => {
  const mockInputRef = { current: document.createElement('input') };
  const mockOnSubmit = jest.fn<(e: React.FormEvent) => Promise<void>>().mockResolvedValue();
  
  const defaultProps = {
    gameState: createMockGameState(),
    onSubmit: mockOnSubmit,
    inputRef: mockInputRef as React.RefObject<HTMLInputElement>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field with correct placeholder when not loading', () => {
    render(<SearchForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter a Pokemon name');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
  });

  it('renders input field with correct placeholder when loading data', () => {
    const gameState = createMockGameState({ isFetchingData: true });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    const input = screen.getByPlaceholderText('Loading Pokemon data...');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('renders input field with correct placeholder when Pokemon are revealed', () => {
    const gameState = createMockGameState({ 
      revealedPokemon: [{ id: 25, name: 'pikachu', sprite: '/sprites/pikachu.png', types: ['Electric'] }]
    });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    const input = screen.getByPlaceholderText("Nice job!");
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('disables input when isLoading is true', () => {
    const gameState = createMockGameState({ isLoading: true });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    const input = screen.getByPlaceholderText('Enter a Pokemon name');
    expect(input).toBeDisabled();
  });

  it('updates input value on change', () => {
    const gameState = createMockGameState();
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    const input = screen.getByPlaceholderText('Enter a Pokemon name');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    
    expect(gameState.setInputValue).toHaveBeenCalledWith('pikachu');
  });

  it('calls onSubmit when form is submitted', () => {
    const { container } = render(<SearchForm {...defaultProps} />);
    
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    
    fireEvent.submit(form!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('shows loading message when searching for Pokemon', () => {
    const gameState = createMockGameState({ isLoading: true });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    expect(screen.getByText('Searching for Pokemon...')).toBeInTheDocument();
  });

  it('shows loading message when fetching Pokemon data', () => {
    const gameState = createMockGameState({ isFetchingData: true });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    expect(screen.getByText('Loading Pokemon data...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    const gameState = createMockGameState({ error: 'Pokemon not found!' });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    expect(screen.getByText('Pokemon not found!')).toBeInTheDocument();
  });

  it('shows no results message when noResults is true', () => {
    const gameState = createMockGameState({ noResults: true });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    expect(screen.getByText('No Pokemon found matching these filters!')).toBeInTheDocument();
  });

  it('shows info message when Pokemon are revealed', () => {
    const gameState = createMockGameState({ 
      revealedPokemon: [{ id: 25, name: 'pikachu', sprite: '/sprites/pikachu.png', types: ['Electric'] }]
    });
    render(<SearchForm {...defaultProps} gameState={gameState} />);
    
    expect(screen.getByText("Click 'Start Over' to try catching Pokemon again!")).toBeInTheDocument();
  });
});