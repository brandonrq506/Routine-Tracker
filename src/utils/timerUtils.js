// Determine if end is before or after now to decide on the sign
const determineSign = (end, now) => end < now ? '-' : '';

const padNumber = number => number.toString().padStart(2, '0');

export const getSecondsLeft = (end) => {
    const now = new Date();
    const msDifference = end - now;
    return Math.floor(msDifference / 1000);
}

// Assume `now` and `end` are Date objects
export function getTimeLeft(end) {
    const now = new Date();
    const msDifference = Math.abs(end - now);
    const timeString = msToTime(msDifference);
    return `${determineSign(end, now)}${timeString}`;
}

export function secondsToTime(seconds) {
    const timeString = formatSeconds(Math.abs(seconds));
    return `${determineSign(seconds, 0)}${timeString}`;
}

export function getPercentageLeft(startTime, endTime) {
    const now = new Date();
    if (now > endTime)
        return 0;

    const totalMs = Math.abs(endTime - startTime);
    const msLeft = Math.abs(endTime - now);
    return Math.round((msLeft / totalMs) * 100);
}

export function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;

    return `${padNumber(hours)}:${padNumber(minutesLeft)}:00`;
}

export function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(secondsLeft)}`;
}

export const msToTime = (miliseconds) => {
    // Calculate hours, minutes and seconds
    const hours = Math.floor(miliseconds / 3600000);
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = ((miliseconds % 60000) / 1000).toFixed(0);

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}