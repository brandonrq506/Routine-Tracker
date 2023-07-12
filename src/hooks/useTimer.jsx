import { getSecondsLeft, getPercentageLeft } from "../utils/timerUtils";
import { useState, useEffect } from "react";
import { add } from "date-fns";

export default function useTimer() {
    const [timerData, setTimerData] = useState({ startTime: null, endTime: null });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(false);

    const start = (avgMinutes) => {
        avgMinutes ??= 60;
        const now = new Date();
        setTimerData({ startTime: now, endTime: add(now, { minutes: avgMinutes }) });
        setCurrentTime(now);
        setIsRunning(true);
    };

    const stop = () => {
        setTimerData({ startTime: null, endTime: null });
        setIsRunning(false);
    }

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => { setCurrentTime(new Date()) }, 1000);
        return () => clearInterval(timer);
    }, [isRunning]);

    return {
        timer: {
            startTime: timerData.startTime,
            endTime: currentTime,
            duration: getSecondsLeft(currentTime, timerData.startTime),
            isRunning,
            isOnTime: timerData.endTime ? timerData.endTime > currentTime : false,
            secondsLeft: timerData.endTime ? getSecondsLeft(timerData.endTime, currentTime) : 0,
            percentage: timerData.endTime ? getPercentageLeft(timerData.startTime, timerData.endTime, currentTime) : 0,
        },
        start,
        stop,
    };
}