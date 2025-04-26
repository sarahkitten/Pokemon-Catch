// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import TimeTrialButton from '../TimeTrialButton';

// describe('TimeTrialButton', () => {
//   const mockOnClick = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders correctly', () => {
//     render(<TimeTrialButton onClick={mockOnClick} />);
    
//     const button = screen.getByRole('button', { name: /time trial/i });
//     expect(button).toBeInTheDocument();
//   });

//   test('calls onClick when clicked', () => {
//     render(<TimeTrialButton onClick={mockOnClick} />);
    
//     const button = screen.getByRole('button', { name: /time trial/i });
//     fireEvent.click(button);
    
//     expect(mockOnClick).toHaveBeenCalledTimes(1);
//   });

//   test('applies correct accessibility attributes', () => {
//     render(<TimeTrialButton onClick={mockOnClick} />);
    
//     const button = screen.getByRole('button', { name: /time trial/i });
//     expect(button).toHaveAttribute('aria-label', 'Start Time Trial Mode');
//   });

//   test('has tooltip with description', () => {
//     render(<TimeTrialButton onClick={mockOnClick} />);
    
//     const button = screen.getByRole('button', { name: /time trial/i });
//     expect(button).toHaveAttribute('title', 'Challenge yourself with timed Pokemon catching');
//   });
// });