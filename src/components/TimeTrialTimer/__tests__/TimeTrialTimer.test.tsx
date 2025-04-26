// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import TimeTrialTimer from '../TimeTrialTimer';

// describe('TimeTrialTimer', () => {
//   test('renders correctly with time remaining', () => {
//     render(<TimeTrialTimer timeRemaining={75} isActive={true} />);
    
//     expect(screen.getByText('1:15')).toBeInTheDocument();
//     expect(screen.getByTestId('time-trial-timer')).toHaveClass('active');
//   });

//   test('formats time correctly for single-digit seconds', () => {
//     render(<TimeTrialTimer timeRemaining={65} isActive={true} />);
    
//     expect(screen.getByText('1:05')).toBeInTheDocument();
//   });

//   test('formats time correctly for zero seconds', () => {
//     render(<TimeTrialTimer timeRemaining={60} isActive={true} />);
    
//     expect(screen.getByText('1:00')).toBeInTheDocument();
//   });

//   test('formats time correctly for less than a minute', () => {
//     render(<TimeTrialTimer timeRemaining={45} isActive={true} />);
    
//     expect(screen.getByText('0:45')).toBeInTheDocument();
//   });

//   test('applies warning class when time is low', () => {
//     render(<TimeTrialTimer timeRemaining={9} isActive={true} />);
    
//     expect(screen.getByTestId('time-trial-timer')).toHaveClass('warning');
//     expect(screen.getByText('0:09')).toBeInTheDocument();
//   });

//   test('applies critical class when time is very low', () => {
//     render(<TimeTrialTimer timeRemaining={4} isActive={true} />);
    
//     expect(screen.getByTestId('time-trial-timer')).toHaveClass('critical');
//     expect(screen.getByText('0:04')).toBeInTheDocument();
//   });

//   test('does not apply active class when not active', () => {
//     render(<TimeTrialTimer timeRemaining={75} isActive={false} />);
    
//     expect(screen.getByTestId('time-trial-timer')).not.toHaveClass('active');
//   });

//   test('applies time-added class when timeAdded prop is true', () => {
//     render(<TimeTrialTimer timeRemaining={75} isActive={true} timeAdded={true} />);
    
//     expect(screen.getByTestId('time-trial-timer')).toHaveClass('time-added');
//   });

//   test('displays time with aria-live for accessibility', () => {
//     render(<TimeTrialTimer timeRemaining={30} isActive={true} />);
    
//     const timerElement = screen.getByTestId('time-trial-timer');
//     expect(timerElement).toHaveAttribute('aria-live', 'polite');
//     expect(timerElement).toHaveAttribute('aria-label', '30 seconds remaining');
//   });
// });