// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import TimeTrialResults from '../TimeTrialResults';
// import { CaughtPokemon } from '../../../types';

// describe('TimeTrialResults', () => {
//   const mockPokemon: CaughtPokemon[] = [
//     { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], sprite: 'bulbasaur.png', time: 10 },
//     { id: 4, name: 'Charmander', types: ['Fire'], sprite: 'charmander.png', time: 20 },
//     { id: 7, name: 'Squirtle', types: ['Water'], sprite: 'squirtle.png', time: 30 },
//   ];

//   const mockProps = {
//     isOpen: true,
//     onClose: jest.fn(),
//     onTryAgain: jest.fn(),
//     onNewChallenge: jest.fn(),
//     caughtPokemon: mockPokemon,
//     totalPokemon: 10,
//     difficulty: 'medium' as const,
//     timeElapsed: 90,
//     pokemonCountCategory: '6-20' as const,
//     generation: 'Gen 1',
//     type: 'All Types',
//     letter: 'All',
//     isEasyMode: false,
//     shareCode: null,
//     generateShareCode: jest.fn(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders correctly with results data when open', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     expect(screen.getByText('Time Trial Results')).toBeInTheDocument();
//     expect(screen.getByText('3/10 Pokémon caught')).toBeInTheDocument();
//     expect(screen.getByText('Time elapsed: 1:30')).toBeInTheDocument();
//     expect(screen.getByText('Difficulty: Medium')).toBeInTheDocument();
    
//     // Check that all caught Pokemon are listed
//     expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
//     expect(screen.getByText('Charmander')).toBeInTheDocument();
//     expect(screen.getByText('Squirtle')).toBeInTheDocument();
//   });

//   test('does not render when isOpen is false', () => {
//     render(<TimeTrialResults {...mockProps} isOpen={false} />);
    
//     expect(screen.queryByText('Time Trial Results')).not.toBeInTheDocument();
//   });

//   test('calls onClose when close button is clicked', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     const closeButton = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(closeButton);
    
//     expect(mockProps.onClose).toHaveBeenCalledTimes(1);
//   });

//   test('calls onTryAgain when try again button is clicked', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     const tryAgainButton = screen.getByRole('button', { name: /try again/i });
//     fireEvent.click(tryAgainButton);
    
//     expect(mockProps.onTryAgain).toHaveBeenCalledTimes(1);
//   });

//   test('calls onNewChallenge when new challenge button is clicked', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     const newChallengeButton = screen.getByRole('button', { name: /new challenge/i });
//     fireEvent.click(newChallengeButton);
    
//     expect(mockProps.onNewChallenge).toHaveBeenCalledTimes(1);
//   });

//   test('displays filter details correctly', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     expect(screen.getByText(/challenge: gen 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/all types/i)).toBeInTheDocument();
//     expect(screen.getByText(/starting with "all"/i)).toBeInTheDocument();
//   });

//   test('displays easy mode indicator when applicable', () => {
//     render(<TimeTrialResults {...mockProps} isEasyMode={true} />);
    
//     expect(screen.getByText(/easy mode: on/i)).toBeInTheDocument();
//   });

//   test('does not display easy mode indicator when false', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     expect(screen.queryByText(/easy mode: on/i)).not.toBeInTheDocument();
//     expect(screen.getByText(/easy mode: off/i)).toBeInTheDocument();
//   });

//   test('shows special message when all Pokemon were caught', () => {
//     render(<TimeTrialResults {...mockProps} caughtPokemon={mockPokemon} totalPokemon={3} />);
    
//     expect(screen.getByText('3/3 Pokémon caught')).toBeInTheDocument();
//     expect(screen.getByText(/congratulations! you caught them all/i)).toBeInTheDocument();
//   });

//   test('shows share options when shareCode exists', () => {
//     const shareCode = 'http://example.com/share?difficulty=medium&pokemonCountCategory=6-20';
//     render(<TimeTrialResults {...mockProps} shareCode={shareCode} />);
    
//     expect(screen.getByLabelText(/share results/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue(shareCode)).toBeInTheDocument();
//   });

//   test('calls generateShareCode when share button is clicked', () => {
//     render(<TimeTrialResults {...mockProps} />);
    
//     const shareButton = screen.getByRole('button', { name: /share/i });
//     fireEvent.click(shareButton);
    
//     expect(mockProps.generateShareCode).toHaveBeenCalledTimes(1);
//   });
// });