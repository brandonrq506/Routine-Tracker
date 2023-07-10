export const parseInfo = (key) => {
    const storedInfo = localStorage.getItem(key);
    if (!storedInfo) return null
    const parsedValue = JSON.parse(storedInfo);

    if (Array.isArray(parsedValue)) {
        return parsedValue.map(item => ({
            ...item,
            startTime: item.startTime ? new Date(item.startTime) : null,
            endTime: item.endTime ? new Date(item.endTime) : null,
        }));
    }
    else if (typeof parsedValue === 'object') {
        return {
            ...parsedValue,
            startTime: parsedValue?.startTime ? new Date(parsedValue.startTime) : null,
            endTime: parsedValue?.endTime ? new Date(parsedValue.endTime) : null,
        };
    }
}

export const stringifyInfo = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));