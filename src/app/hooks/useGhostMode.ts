import { useState, useEffect } from 'react';

interface UseGhostModeOptions {
  inactivityTimeout?: number; // milliseconds
  footerThreshold?: number; // percentage (0-1)
}

export function useGhostMode(options: UseGhostModeOptions = {}) {
  const {
    inactivityTimeout = 5000, // 5 seconds default
    footerThreshold = 0.85, // Bottom 15% of page
  } = options;

  const [isInFooter, setIsInFooter] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Detect if user is near the bottom (footer area)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Check if we're in the bottom area (footer)
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      setIsInFooter(scrollPercentage > footerThreshold);
      
      // Reset inactivity on scroll
      setLastActivityTime(Date.now());
      setIsInactive(false);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [footerThreshold]);

  // Detect mouse movement and inactivity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivityTime(Date.now());
      setIsInactive(false);
    };

    const handleMouseMove = () => handleActivity();
    const handleKeyDown = () => handleActivity();
    const handleClick = () => handleActivity();
    const handleTouch = () => handleActivity();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  // Check for inactivity
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTime;
      
      if (timeSinceLastActivity >= inactivityTimeout) {
        setIsInactive(true);
      }
    };

    const interval = setInterval(checkInactivity, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, [lastActivityTime, inactivityTimeout]);

  // Ghost mode is active if either condition is met
  const isGhostMode = isInFooter || isInactive;

  return {
    isGhostMode,
    isInFooter,
    isInactive,
  };
}
