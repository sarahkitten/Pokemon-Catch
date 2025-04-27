import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeTrialTimer } from '../TimeTrialTimer';

describe('TimeTrialTimer Component', () => {
  test('renders the timer with formatted time', () => {
    render(<TimeTrialTimer timeRemaining={65} isActive={true} isPaused={false} />);
    
    // Should format 65 seconds as "01:05"
    const timeDisplay = screen.getByText('01:05');
    expect(timeDisplay).toBeInTheDocument();
  });
  
  test('shows time-warning class when time is low', () => {
    render(<TimeTrialTimer timeRemaining={25} isActive={true} isPaused={false} />);
    
    const timeDisplay = screen.getByText('00:25');
    expect(timeDisplay).toHaveClass('time-warning');
  });
  
  test('shows time-critical class when time is very low', () => {
    render(<TimeTrialTimer timeRemaining={9} isActive={true} isPaused={false} />);
    
    const timeDisplay = screen.getByText('00:09');
    expect(timeDisplay).toHaveClass('time-critical');
  });
  
  test('shows paused indicator when paused', () => {
    render(<TimeTrialTimer timeRemaining={65} isActive={true} isPaused={true} />);
    
    const pausedIndicator = screen.getByText('PAUSED');
    expect(pausedIndicator).toBeInTheDocument();
  });
  
  test('shows time added animation when time increases', () => {
    const { rerender } = render(
      <TimeTrialTimer timeRemaining={65} isActive={true} isPaused={false} timeAdded={10} />
    );
    
    // No animation shown initially
    expect(screen.queryByText('+10s')).not.toBeInTheDocument();
    
    // Rerender with increased time to trigger the animation
    rerender(
      <TimeTrialTimer timeRemaining={75} isActive={true} isPaused={false} timeAdded={10} />
    );
    
    // Now animation should be shown
    expect(screen.getByText('+10s')).toBeInTheDocument();
  });
  
  test('removes time added animation after delay', async () => {
    jest.useFakeTimers();
    
    const { rerender } = render(
      <TimeTrialTimer timeRemaining={65} isActive={true} isPaused={false} timeAdded={10} />
    );
    
    rerender(
      <TimeTrialTimer timeRemaining={75} isActive={true} isPaused={false} timeAdded={10} />
    );
    
    // Animation should be shown
    expect(screen.getByText('+10s')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    
    // Animation should be gone
    expect(screen.queryByText('+10s')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});