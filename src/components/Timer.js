import React, { useEffect, useState } from 'react';


const Timer = ({ onTimeout, reset }) => {
  const [time, setTime] = useState(30);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (reset) {
      setTime(30);
      setExpired(false);
    }

    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setExpired(true);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reset, onTimeout]);

  return (
    <div className={`timer-container ${expired ? 'timer-expired' : ''}`}>
      <p className="timer-text">Time left: {time}s</p>
    </div>
  );
};

export default Timer;
