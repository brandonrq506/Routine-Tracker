import { getSecondsLeft, getPercentageLeft, getSecondsSinceStart } from "../utils/timerUtils";
import { useState, useEffect } from "react";
import { add } from "date-fns";

const useTimer = () => {
    const [data, setData] = useState({ startTime: null, endTime: null });
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const start = (avgMinutes = 60) => {
        setData({
            startTime: new Date(),
            endTime: add(new Date(), { minutes: avgMinutes }),
        });
        setIsRunning(true);
    };

    const stop = () => {
        setData({ startTime: null, endTime: null });
        setSeconds(0);
        setIsRunning(false);
    }

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    return {
        timer: {
            startTime: data.startTime,
            endTime: new Date(),
            duration: getSecondsSinceStart(data.startTime),
            isRunning,
            secondsLeft: data.endTime ? getSecondsLeft(data.endTime) : 0,
            percentage: data.endTime ? getPercentageLeft(data.startTime, data.endTime) : 0,
        },
        start,
        stop,
    };
};

export default useTimer;