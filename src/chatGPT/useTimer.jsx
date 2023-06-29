// hooks/useTimer.js
import { useState, useEffect } from 'react';

const useTimer = (initialSeconds, resetTrigger) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    // Reset the timer when the resetTrigger changes
    useEffect(() => {
        setSeconds(initialSeconds);
        setIsActive(false);
    }, [resetTrigger, initialSeconds]);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return { seconds, isActive, setIsActive };
};

export default useTimer;