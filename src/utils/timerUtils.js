// Determine if end is before or after now to decide on the sign
const determineSign = (end, now) => end < now ? '-' : '';

const padNumber = number => number.toString().padStart(2, '0');

export const secondsToMinutes = (seconds) => Math.floor(seconds / 60);

export const getSecondsLeft = (endTime, currentTime) =>
    Math.floor((endTime - currentTime) / 1000);

export function secondsToTime(seconds) {
    const timeString = formatSeconds(Math.abs(seconds));
    return `${determineSign(seconds, 0)}${timeString}`;
}

export function getTimeLeft(end) {
    const now = new Date();
    const msDifference = Math.abs(end - now);
    const timeString = msToTime(msDifference);
    return `${determineSign(end, now)}${timeString}`;
}

export function getPercentageLeft(startTime, endTime, currentTime) {
    if (currentTime > endTime) return 0;

    const totalMili = Math.abs(endTime - startTime);
    const miliLeft = Math.abs(endTime - currentTime);
    return Math.round((miliLeft / totalMili) * 100);
}

function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(secondsLeft)}`;
}

const msToTime = (miliseconds) => {
    // Calculate hours, minutes and seconds
    const hours = Math.floor(miliseconds / 3600000);
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = ((miliseconds % 60000) / 1000).toFixed(0);

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}