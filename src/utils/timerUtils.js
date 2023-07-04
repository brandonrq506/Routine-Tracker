export function getTimeLeft(end) {
    // Assume `now` and `end` are Date objects
    const now = new Date();
    const msDifference = Math.abs(end - now);
    const timeString = msToTime(msDifference);
    return `${determineSign(end, now)}${timeString}`;
}

export function secondsToTime(seconds) {

}

export function minutesToTime(minutes) {
    
}


export function getPercentageLeft(startTime, endTime) {
    const now = new Date();

    if (now > endTime)
        return 0;

    const msDifference = Math.abs(endTime - startTime);
    const msLeft = Math.abs(endTime - now);
    const result = Math.round((msLeft / msDifference) * 100);
    return result;
}

export const msToTime = (duration) => {
    // Calculate hours, minutes and seconds
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    // Add leading zeros if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const determineSign = (end, now) => {
    // Determine if end is before or after now to decide on the sign
    return end < now ? '-' : '';
}
