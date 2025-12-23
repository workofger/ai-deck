'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TimerState {
  seconds: number;
  isRunning: boolean;
  formatted: string;
}

interface UseTimerReturn extends TimerState {
  start: () => void;
  pause: () => void;
  reset: () => void;
  toggle: () => void;
}

export function useTimer(initialSeconds = 0): UseTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const toggle = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    formatted: formatTime(seconds),
    start,
    pause,
    reset,
    toggle
  };
}

