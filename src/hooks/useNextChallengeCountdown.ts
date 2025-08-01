import { useState, useEffect } from 'react';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useNextChallengeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): CountdownTime => {
      const now = new Date();
      
      // Get the current time in Pacific timezone
      const pacificNow = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      
      // Calculate next midnight Pacific time
      const nextMidnightPacific = new Date(pacificNow);
      nextMidnightPacific.setDate(nextMidnightPacific.getDate() + 1);
      nextMidnightPacific.setHours(0, 0, 0, 0);
      
      // Convert back to local time for calculation
      const pacificOffset = pacificNow.getTimezoneOffset() - now.getTimezoneOffset();
      const nextMidnightLocal = new Date(nextMidnightPacific.getTime() - (pacificOffset * 60000));
      
      const difference = nextMidnightLocal.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: CountdownTime): string => {
    const { hours, minutes, seconds } = time;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return { timeLeft, formatTime };
};
