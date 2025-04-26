// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import TimeTrialOptions from '../TimeTrialOptions';
// import { TIME_TRIAL } from '../../../constants';

// describe('TimeTrialOptions', () => {
//   const mockProps = {
//     isOpen: true,
//     onClose: jest.fn(),
//     onStart: jest.fn(),
//     difficulty: 'medium' as const,
//     setDifficulty: jest.fn(),
//     pokemonCountCategory: '6-20' as const,
//     setPokemonCountCategory: jest.fn(),
//     isEasyMode: false,
//     setIsEasyMode: jest.fn(),
//     generateShareCode: jest.fn(),
//     shareCode: null,
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders with correct title and options when open', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     expect(screen.getByText('Time Trial Settings')).toBeInTheDocument();
//     expect(screen.getByText('Difficulty')).toBeInTheDocument();
//     expect(screen.getByText('Pokémon Count')).toBeInTheDocument();
//     expect(screen.getByText('Easy Mode')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /start challenge/i })).toBeInTheDocument();
//   });

//   test('does not render when isOpen is false', () => {
//     render(<TimeTrialOptions {...mockProps} isOpen={false} />);
    
//     expect(screen.queryByText('Time Trial Settings')).not.toBeInTheDocument();
//   });

//   test('calls onClose when close button is clicked', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     const closeButton = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(closeButton);
    
//     expect(mockProps.onClose).toHaveBeenCalledTimes(1);
//   });

//   test('updates difficulty when option is changed', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     // Find the difficulty selector
//     const easyOption = screen.getByRole('radio', { name: /easy/i });
//     fireEvent.click(easyOption);
    
//     expect(mockProps.setDifficulty).toHaveBeenCalledWith('easy');
//   });

//   test('updates Pokemon count category when option is changed', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     // Find the Pokemon count category selector
//     const fewOption = screen.getByRole('radio', { name: /1-5/i });
//     fireEvent.click(fewOption);
    
//     expect(mockProps.setPokemonCountCategory).toHaveBeenCalledWith('1-5');
//   });

//   test('toggles easy mode when checkbox is clicked', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     const easyModeCheckbox = screen.getByRole('checkbox', { name: /easy mode/i });
//     fireEvent.click(easyModeCheckbox);
    
//     expect(mockProps.setIsEasyMode).toHaveBeenCalledWith(true);
//   });

//   test('displays difficulty description based on selected difficulty', () => {
//     render(<TimeTrialOptions {...mockProps} difficulty="hard" />);
    
//     const difficultyDescription = screen.getByText(
//       `Start with ${TIME_TRIAL.DIFFICULTY.HARD.initialTime} seconds, +${TIME_TRIAL.DIFFICULTY.HARD.timePerCatch} seconds per catch`
//     );
//     expect(difficultyDescription).toBeInTheDocument();
//   });

//   test('calls onStart when start button is clicked', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     const startButton = screen.getByRole('button', { name: /start challenge/i });
//     fireEvent.click(startButton);
    
//     expect(mockProps.onStart).toHaveBeenCalledTimes(1);
//   });

//   test('shows share option when shareCode exists', () => {
//     const shareCode = 'http://example.com/share?difficulty=medium&pokemonCountCategory=6-20';
//     render(<TimeTrialOptions {...mockProps} shareCode={shareCode} />);
    
//     expect(screen.getByLabelText(/share challenge/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue(shareCode)).toBeInTheDocument();
//   });

//   test('generates share code when share button is clicked', () => {
//     render(<TimeTrialOptions {...mockProps} />);
    
//     const shareButton = screen.getByRole('button', { name: /share/i });
//     fireEvent.click(shareButton);
    
//     expect(mockProps.generateShareCode).toHaveBeenCalledTimes(1);
//   });
// });