import { useState, useEffect, useCallback } from 'react';
import type { TimeTrialDifficulty } from '../types';
import { TIME_TRIAL } from '../constants';

interface TimerOptions {
  initialTime?: number; // time in seconds
  autoStart?: boolean;
}

interface TimeTrialTimerState {
  isRunning: boolean;
  timeRemaining: number; // seconds
  elapsedTime: number; // seconds
  timerStarted: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: (newTime?: number) => void;
  addTime: (seconds: number) => void;
}

/**
 * Maps difficulty level to initial time in seconds
 */
const DIFFICULTY_TIME_MAP: Record<TimeTrialDifficulty, number> = {
  'easy': TIME_TRIAL.DIFFICULTY.EASY.initialTime,
  'medium': TIME_TRIAL.DIFFICULTY.MEDIUM.initialTime,
  'hard': TIME_TRIAL.DIFFICULTY.HARD.initialTime,
};

/**
 * Maps difficulty level to time bonus (in seconds) for catching a Pokémon
 */
const CATCH_BONUS_TIME_MAP: Record<TimeTrialDifficulty, number> = {
  'easy': TIME_TRIAL.DIFFICULTY.EASY.timePerCatch,
  'medium': TIME_TRIAL.DIFFICULTY.MEDIUM.timePerCatch,
  'hard': TIME_TRIAL.DIFFICULTY.HARD.timePerCatch,
};

/**
 * Utility function to get initial time for a difficulty
 * Simplifies getting the timer value in multiple places
 */
export const getInitialTimeForDifficulty = (difficulty: TimeTrialDifficulty): number => {
  return DIFFICULTY_TIME_MAP[difficulty];
};

export const useTimeTrialTimer = (difficulty: TimeTrialDifficulty = 'medium', options: TimerOptions = {}): TimeTrialTimerState => {
  
  // Get initial time based on difficulty or from options
  const getInitialTime = useCallback(() => {
    return options.initialTime !== undefined ? options.initialTime : DIFFICULTY_TIME_MAP[difficulty];
  }, [difficulty, options.initialTime]);

  const [timeRemaining, setTimeRemaining] = useState<number>(getInitialTime());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(!!options.autoStart);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let timerId: number | undefined;

    if (isRunning && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(timerId);
            setIsRunning(false);
            return 0;
          }
          return newTime;
        });
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, timeRemaining]);

  // Start timer method
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setTimerStarted(true);
  }, []);

  // Pause timer method
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Resume timer method
  const resumeTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Reset timer method
  const resetTimer = useCallback((newTime?: number) => {
    setIsRunning(false);
    const initialTime = getInitialTime();
    setTimeRemaining(newTime !== undefined ? newTime : initialTime);
    setElapsedTime(0);
    setTimerStarted(false);
  }, [getInitialTime, difficulty]);

  // Add time method (for bonuses when catching a Pokemon)
  const addTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => prev + seconds);
  }, []);

  // Auto-start timer if option is set
  useEffect(() => {
    if (options.autoStart) {
      startTimer();
    }
  }, [options.autoStart, startTimer]);

  return {
    isRunning,
    timeRemaining,
    elapsedTime,
    timerStarted,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addTime
  };
};

// Helper function to get the bonus time for catching a Pokemon based on difficulty
export const getCatchBonusTime = (difficulty: TimeTrialDifficulty): number => {
  return CATCH_BONUS_TIME_MAP[difficulty];
};

// Helper to format time as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};