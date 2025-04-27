import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeTrialCountdown } from '../TimeTrialCountdown';

// Mock timers for testing countdown
jest.useFakeTimers();

describe('TimeTrialCountdown', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should not render when isVisible is false', () => {
    render(<TimeTrialCountdown isVisible={false} onComplete={() => {}} />);
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(screen.queryByText('GO!')).not.toBeInTheDocument();
  });

  it('should show countdown from 3 when visible', () => {
    render(<TimeTrialCountdown isVisible={true} onComplete={() => {}} />);
    
    // Should start with 3
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // After 1 second, should show 2
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // After another second, should show 1
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // After another second, should show GO!
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('GO!')).toBeInTheDocument();
  });

  it('should call onComplete after countdown finishes', () => {
    const mockOnComplete = jest.fn();
    render(<TimeTrialCountdown isVisible={true} onComplete={mockOnComplete} />);
    
    // Advance through the countdown (3, 2, 1)
    act(() => {
      jest.advanceTimersByTime(3000); // Get past 3, 2, 1
    });
    
    // Wait for "GO!" to be displayed and the callback to be called
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // onComplete should be called
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('should reset when visibility changes', () => {
    const { rerender } = render(<TimeTrialCountdown isVisible={true} onComplete={() => {}} />);
    
    // Advance partway through the countdown
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Hide the component
    rerender(<TimeTrialCountdown isVisible={false} onComplete={() => {}} />);
    
    // Show it again - should restart from 3
    rerender(<TimeTrialCountdown isVisible={true} onComplete={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});