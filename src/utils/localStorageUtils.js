export const parseInfo = (key) =>
    JSON.parse(localStorage.getItem(key));

export const stringifyInfo = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));