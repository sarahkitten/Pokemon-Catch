// Import testing library extensions
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Make jest available globally
global.jest = jest;

// Mock the Audio API for tests
class MockAudio {
  play = jest.fn().mockImplementation(() => Promise.resolve());
  pause = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
}

global.Audio = MockAudio as unknown as typeof Audio;