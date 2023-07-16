import { getSecondsLeft, getPercentageLeft } from "../utils/timerUtils";
import { useState, useEffect } from "react";
import { add } from "date-fns";

export default function useTimer() {
    const [timerData, setTimerData] = useState({ startTime: null, endTime: null });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(false);

    //It this function starts my timer, why is it also creating a date, setting timer data, and setting current time?
    //We should have different functions for that.
    const start = (avgMinutes, startTime) => {
        avgMinutes ??= 60;
        startTime ??= new Date();
        setTimerData({ startTime: startTime, endTime: add(startTime, { minutes: avgMinutes }) });
        setCurrentTime(startTime);
        setIsRunning(true);
    }

    const stop = () => {
        setTimerData({ startTime: null, endTime: null });
        setIsRunning(false);
    }

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => { setCurrentTime(new Date()) }, 1000);
        return () => clearInterval(timer);
    }, [isRunning]);

    /* 
    Timer should just return:
    start(),
    stop(),
    isRunning,
    timer: {
        startTime: Date,
        endTime: Date,
    }
    All the other stuff should be computed in the component that uses the hook.
    So they can use the timer data to display whatever they want. Instead of getting opinionated data from the hook.
    */
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