import activityLookup from '../store/activityLookup'

const cleanUp = (string) => string.trim().toLowerCase();

//Only handles the iteration, does not know how the matching is done.
const findActivity = (activityName, matcher) => {
    const name = cleanUp(activityName);
    return activityLookup.find(activity =>
        matcher(name, cleanUp(activity.name)));
}

//This function passes down the activityName and additionally how to match
const exactMatch = activityName =>
    findActivity(activityName, (name, activityName) => name === activityName);

//This function passes down the activityName and additionally how to match
const approximateMatch = activityName =>
    findActivity(activityName, (name, activityName) => name.startsWith(activityName));

//Decides what matcher to use
export const getActivity = activityName =>
    activityName.includes(":") ? approximateMatch(activityName) : exactMatch(activityName);

export const findAvgTime = activityName => {
    const activity = getActivity(activityName);
    return activity ? activity.avgTime : null;
}

export const findCategory = activityName => {
    const activity = getActivity(activityName);
    return activity ? activity.category : null;
}