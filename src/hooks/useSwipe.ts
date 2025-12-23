'use client';

import { useState, TouchEvent, useCallback } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50
}: UseSwipeOptions): SwipeHandlers {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > minSwipeDistance && onSwipeLeft) {
        onSwipeLeft();
      } else if (distanceX < -minSwipeDistance && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      if (distanceY > minSwipeDistance && onSwipeUp) {
        onSwipeUp();
      } else if (distanceY < -minSwipeDistance && onSwipeDown) {
        onSwipeDown();
      }
    }
  }, [touchStart, touchEnd, minSwipeDistance, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

