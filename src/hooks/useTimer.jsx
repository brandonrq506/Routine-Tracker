import { useState, useEffect } from "react";
import { add } from 'date-fns';
import { getTimeLeft, getPercentageLeft, msToTime } from '../utils/timerUtils'

const useTimer = () => {
    const [metaData, setMetaData] = useState({ startTime: null, endTime: null, duration: 0 });
    const [timeLeft, setTimeLeft] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const start = (avgMinutes = 60) => {
        const startTime = new Date();
        const endTime = add(startTime, { minutes: avgMinutes });
        setIsRunning(true);
        setMetaData({ startTime, endTime });
    };

    const stop = () => setIsRunning(false);

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => {
            const timeLeft = getTimeLeft(metaData.endTime);
            const percentage = getPercentageLeft(metaData.startTime, metaData.endTime);
            const duration = msToTime(new Date().getTime() - metaData.startTime?.getTime());
            setTimeLeft(timeLeft);
            setPercentage(percentage);
            setMetaData(prev => ({ ...prev, duration }));
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, metaData]);

    return {
        timeLeft,
        percentage,
        metaData,
        isRunning,
        start,
        stop,
    }
};

export default useTimer;