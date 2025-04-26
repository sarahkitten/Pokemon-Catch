// import React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import TimeTrialCountdown from '../TimeTrialCountdown';
// import { TIME_TRIAL } from '../../../constants';

// describe('TimeTrialCountdown', () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//   });

//   afterEach(() => {
//     jest.useRealTimers();
//   });

//   test('renders countdown starting from the specified value', () => {
//     render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     expect(screen.getByText(TIME_TRIAL.COUNTDOWN_SECONDS.toString())).toBeInTheDocument();
//   });
  
//   test('does not render when not active', () => {
//     render(<TimeTrialCountdown isActive={false} onComplete={jest.fn()} />);
    
//     expect(screen.queryByText(TIME_TRIAL.COUNTDOWN_SECONDS.toString())).not.toBeInTheDocument();
//   });
  
//   test('counts down each second', () => {
//     render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     // Initial value
//     expect(screen.getByText(TIME_TRIAL.COUNTDOWN_SECONDS.toString())).toBeInTheDocument();
    
//     // Advance 1 second
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });
    
//     // Should now show 2
//     expect(screen.getByText((TIME_TRIAL.COUNTDOWN_SECONDS - 1).toString())).toBeInTheDocument();
    
//     // Advance 1 more second
//     act(() => {
//       jest.advanceTimersByTime(1000);
//     });
    
//     // Should now show 1
//     expect(screen.getByText('1')).toBeInTheDocument();
//   });
  
//   test('shows "GO!" after countdown reaches 0', () => {
//     render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     // Advance to the end of countdown
//     act(() => {
//       jest.advanceTimersByTime(TIME_TRIAL.COUNTDOWN_SECONDS * 1000);
//     });
    
//     // Should now show "GO!"
//     expect(screen.getByText('GO!')).toBeInTheDocument();
//   });
  
//   test('calls onComplete after countdown plus "GO!" display time', () => {
//     const onCompleteMock = jest.fn();
//     render(<TimeTrialCountdown isActive={true} onComplete={onCompleteMock} />);
    
//     // Advance through the countdown and the GO! display (1 second)
//     act(() => {
//       jest.advanceTimersByTime((TIME_TRIAL.COUNTDOWN_SECONDS + 1) * 1000);
//     });
    
//     // onComplete should have been called
//     expect(onCompleteMock).toHaveBeenCalledTimes(1);
//   });
  
//   test('applies animation classes during countdown', () => {
//     render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     // Check for animation classes
//     const countdownElement = screen.getByTestId('countdown-container');
//     expect(countdownElement).toHaveClass('animate');
    
//     // Advance to GO!
//     act(() => {
//       jest.advanceTimersByTime(TIME_TRIAL.COUNTDOWN_SECONDS * 1000);
//     });
    
//     // Should have GO! animation class
//     expect(countdownElement).toHaveClass('go-animation');
//   });
  
//   test('has appropriate accessibility attributes', () => {
//     render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     const countdownElement = screen.getByTestId('countdown-container');
//     expect(countdownElement).toHaveAttribute('aria-live', 'assertive');
//     expect(countdownElement).toHaveAttribute('role', 'status');
//   });
  
//   test('clears timers when component unmounts', () => {
//     const { unmount } = render(<TimeTrialCountdown isActive={true} onComplete={jest.fn()} />);
    
//     // Create a spy on clearTimeout
//     const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
//     // Unmount the component
//     unmount();
    
//     // clearTimeout should have been called
//     expect(clearTimeoutSpy).toHaveBeenCalled();
    
//     // Clean up spy
//     clearTimeoutSpy.mockRestore();
//   });
// });