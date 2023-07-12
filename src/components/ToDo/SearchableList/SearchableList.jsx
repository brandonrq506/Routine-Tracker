import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

import { filterActivities, getActivity } from '../../../utils/activityUtils';
import SearchInput from '../../UI/SearchInput/SearchInput';
import OptionList from '../../UI/OptionList/OptionList';

const SearchableList = ({ activities, onSubmit, maxResults = 5 }) => {
    const inputRef = useRef();
    const [searchText, setSearchText] = useState('');

    const onSelectPill = pillText => {
        setSearchText(pillText);
        inputRef.current.focus();
    }

    const foundActivities = filterActivities(activities, searchText).slice(0, maxResults);
    const defaultOptions = searchText ? [] : ['Break', 'Barbara', 'Reply', 'React:', 'Bathroom'];


    return (
        <>
            <SearchInput
                value={searchText}
                ref={inputRef}
                onChange={newText => setSearchText(newText)}
                onSubmit={onSubmit}
            />
            <OptionList
                options={foundActivities}
                onClick={onSelectPill}
                defaultOptions={defaultOptions.map(activity => getActivity(activity))}
            />
        </>
    )
}

SearchableList.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired,
    maxResults: PropTypes.number,
}

export default SearchableList;


/* 
When I CLICK on one of the element, I want them to be added to the list, not to the input.
When I FULLY type a task name, and it does not have a : in it, I want it to be added to the list, not to the input.
I want searchable list to have 5 pre-defined suggestions when there is nothing in the input. These are configurable
from a config panel.
*/