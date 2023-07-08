import { getSecondsLeft, getPercentageLeft, getSecondsSinceStart } from "../utils/timerUtils";
import { useState, useEffect } from "react";
import { add } from "date-fns";

const useTimer = () => {
    //Update endTime with 'ExpectedEndTime'
    const [data, setData] = useState({ startTime: null, endTime: null });
    const [isRunning, setIsRunning] = useState(false);
    //Remove this state with const [endTime, setEndTime] = useState(new Date());
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

    //This will set endTime to new Date() every second.
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
            //If we follow the commens at the end of the file, here we can do 
            //date-fns.differenceInSeconds(data.startTime, data.endTime)
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

/* 
Can we make it so instead of increasing a second every second, we simply update data.endTime = new Date()?
That way we removed the variable we are NOT using.
And we don't have to create so many new Date() objects in our timeUtils.js file.
*/