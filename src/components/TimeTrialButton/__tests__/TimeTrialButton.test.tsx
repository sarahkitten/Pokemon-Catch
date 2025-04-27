import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeTrialButton } from '../TimeTrialButton';

describe('TimeTrialButton', () => {
  test('renders correctly with default props', () => {
    const mockStartTimeTrial = jest.fn();
    render(<TimeTrialButton onStartTimeTrial={mockStartTimeTrial} />);
    
    // Check if button is rendered with correct text
    const button = screen.getByRole('button', { name: /time trial/i });
    expect(button).toBeInTheDocument();
    
    // Check if it has the correct class
    expect(button).toHaveClass('time-trial-button');
    expect(button).toHaveClass('nes-btn');
    expect(button).toHaveClass('is-warning');
    
    // Check if the icon is rendered
    const icon = screen.getByAltText('Time Trial');
    expect(icon).toBeInTheDocument();
  });

  test('applies additional className when provided', () => {
    const mockStartTimeTrial = jest.fn();
    render(<TimeTrialButton onStartTimeTrial={mockStartTimeTrial} className="test-class" />);
    
    const container = screen.getByRole('button', { name: /time trial/i }).closest('.time-trial-button-container');
    expect(container).toHaveClass('test-class');
  });

  test('calls onStartTimeTrial when clicked', () => {
    const mockStartTimeTrial = jest.fn();
    render(<TimeTrialButton onStartTimeTrial={mockStartTimeTrial} />);
    
    const button = screen.getByRole('button', { name: /time trial/i });
    fireEvent.click(button);
    
    expect(mockStartTimeTrial).toHaveBeenCalledTimes(1);
  });
});