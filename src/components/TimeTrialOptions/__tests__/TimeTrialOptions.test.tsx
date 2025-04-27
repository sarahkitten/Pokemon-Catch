import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeTrialOptions } from '../TimeTrialOptions';

// Manually mock the constants needed by the component
const mockTimeTrialConstants = {
  TIME_TRIAL: {
    DIFFICULTY: {
      EASY: { name: 'Easy', initialTime: 120, timePerCatch: 15 },
      MEDIUM: { name: 'Medium', initialTime: 90, timePerCatch: 10 },
      HARD: { name: 'Hard', initialTime: 60, timePerCatch: 5 }
    },
    POKEMON_COUNT_CATEGORIES: {
      VERY_FEW: { name: '1-5', range: [1, 5] },
      FEW: { name: '6-20', range: [6, 20] },
      MEDIUM: { name: '21-50', range: [21, 50] },
      MANY: { name: '50+', range: [51, Infinity] },
      ALL: { name: 'All', range: [1, Infinity] }
    }
  }
};

// Mock the import
jest.mock('../../../constants', () => mockTimeTrialConstants, { virtual: true });

describe('TimeTrialOptions', () => {
  const mockOnClose = jest.fn();
  const mockOnStart = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders nothing when isOpen is false', () => {
    const { container } = render(
      <TimeTrialOptions 
        isOpen={false} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
  
  test('renders dialog when isOpen is true', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    const dialog = screen.getByText('Time Trial Options');
    expect(dialog).toBeInTheDocument();
    
    // Check for sections
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Pokemon Count')).toBeInTheDocument();
    expect(screen.getByText('Easy Mode (accept close spellings)')).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
  
  test('renders difficulty options correctly', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Check difficulty buttons
    expect(screen.getByRole('button', { name: 'Easy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hard' })).toBeInTheDocument();
    
    // Check initial selection (medium should be selected by default)
    const mediumButton = screen.getByRole('button', { name: 'Medium' });
    expect(mediumButton).toHaveClass('is-primary');
  });
  
  test('renders Pokemon count options correctly', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Check Pokemon count buttons
    expect(screen.getByRole('button', { name: '1-5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '6-20' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '21-50' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '50+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    
    // Check initial selection (6-20 should be selected by default)
    const fewButton = screen.getByRole('button', { name: '6-20' });
    expect(fewButton).toHaveClass('is-primary');
  });
  
  test('allows changing difficulty', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Initial state: Medium is selected
    const mediumButton = screen.getByRole('button', { name: 'Medium' });
    expect(mediumButton).toHaveClass('is-primary');
    
    // Change to Hard
    const hardButton = screen.getByRole('button', { name: 'Hard' });
    fireEvent.click(hardButton);
    
    // Hard should now be selected
    expect(hardButton).toHaveClass('is-primary');
    expect(mediumButton).not.toHaveClass('is-primary');
    
    // Description should now reflect Hard difficulty settings
    expect(screen.getByText(/Start with 60 seconds/i)).toBeInTheDocument();
    expect(screen.getByText(/Earn \+5 seconds for each Pokemon caught/i)).toBeInTheDocument();
  });
  
  test('allows changing Pokemon count category', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Initial state: 6-20 is selected
    const fewButton = screen.getByRole('button', { name: '6-20' });
    expect(fewButton).toHaveClass('is-primary');
    
    // Change to 21-50
    const mediumButton = screen.getByRole('button', { name: '21-50' });
    fireEvent.click(mediumButton);
    
    // 21-50 should now be selected
    expect(mediumButton).toHaveClass('is-primary');
    expect(fewButton).not.toHaveClass('is-primary');
  });
  
  test('allows toggling Easy Mode', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Initial state: Easy Mode is off
    const easyModeCheckbox = screen.getByRole('checkbox');
    expect(easyModeCheckbox).not.toBeChecked();
    expect(screen.getByText('Try to catch all the Pokémon that match the description!')).toBeInTheDocument();
    
    // Toggle Easy Mode on
    fireEvent.click(easyModeCheckbox);
    
    // Easy Mode should now be on
    expect(easyModeCheckbox).toBeChecked();
    // The component just keeps showing the same description text
    expect(screen.getByText('Try to catch all the Pokémon that match the description!')).toBeInTheDocument();
  });
  
  test('calls onClose when Cancel button is clicked', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('calls onStart with correct settings when Start button is clicked', () => {
    render(
      <TimeTrialOptions 
        isOpen={true} 
        onClose={mockOnClose} 
        onStart={mockOnStart} 
      />
    );
    
    // Change options
    const hardButton = screen.getByRole('button', { name: 'Hard' });
    fireEvent.click(hardButton);
    
    const allButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allButton);
    
    const easyModeCheckbox = screen.getByRole('checkbox');
    fireEvent.click(easyModeCheckbox);
    
    // Click Start
    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);
    
    // Verify onStart was called with correct settings
    expect(mockOnStart).toHaveBeenCalledTimes(1);
    expect(mockOnStart).toHaveBeenCalledWith({
      difficulty: 'hard',
      pokemonCountCategory: 'All',
      isEasyMode: true
    });
  });
});