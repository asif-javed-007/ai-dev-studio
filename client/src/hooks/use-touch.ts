import { useCallback } from "react";

export function useTouch() {
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Prevent scrolling while dragging
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
  };
}
