import { v4 as uuidv4 } from 'uuid';
import { proper } from './stringUtils';
import activityLookup from '../store/activityLookup'

const cleanUp = string => string.trim().toLowerCase();

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

const transformInput = (search, activity) => ({
    searchTerm: search.toLowerCase(),
    activity: activity.toLowerCase()
});

//Decides what matcher to use
export const getActivity = activityName => activityName.includes(":") ?
    approximateMatch(activityName) :
    exactMatch(activityName);

export const findActivityProperty = (activityName, property) => getActivity(activityName)?.[property] ?? null;

export const createActivity = name => ({
    id: uuidv4(),
    name: proper(name),
    category: findActivityProperty(name, "category"),
    avgTime: findActivityProperty(name, "avgTime"),
});


export const filterActivities = (activities, searchText) =>
    activities.filter(item => {
        const { searchTerm, activity } = transformInput(searchText, item.name);
        return searchTerm && activity.startsWith(searchTerm) && activity !== searchTerm;
    });