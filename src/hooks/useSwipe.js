import { useEffect } from "react";

const useSwipe = (onSwipeLeft, onSwipeRight) => {
  useEffect(() => {
    const handleTouchStart = (e) => {
      const touchStartX = e.touches[0].clientX;
      let isSwiping = false;
      const handleTouchMove = (e) => {
        const touchCurrentX = e.touches[0].clientX;
        const deltaX = touchCurrentX - touchStartX;

        if (!isSwiping && Math.abs(deltaX) > 50) {
          isSwiping = true;
          if (deltaX < 0) {
            onSwipeLeft();
          } else {
            onSwipeRight();
          }
        }
      };

      const handleTouchEnd = () => {
        isSwiping = false;
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [onSwipeLeft, onSwipeRight]);
};

export default useSwipe;
