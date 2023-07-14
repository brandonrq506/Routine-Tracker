import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

import { filterActivities, getActivity, createActivity } from '../../../utils/activityUtils';
import SearchInput from '../../UI/SearchInput/SearchInput';
import OptionList from '../../UI/OptionList/OptionList';

const SearchableList = ({ activities, onSubmit, maxResults = 5 }) => {
    const inputRef = useRef();
    const [searchText, setSearchText] = useState('');
    const isValid = !!getActivity(searchText);


    const onPillSelect = pillText => {
        setSearchText(pillText);
        inputRef.current.focus();
    }

    const handleSubmit = text => {
        const activity = createActivity(text);
        onSubmit(activity);
        setSearchText('');
    }

    const onPillClick = pillText => {
        pillText.endsWith(':') ?
            onPillSelect(pillText) :
            handleSubmit(pillText)
    }

    const foundActivities = filterActivities(activities, searchText).slice(0, maxResults);
    const defaultOptions = searchText ? [] : ['Break', 'Barbara', 'Reply', 'React:', 'Bathroom'];

    return (
        <>
            <SearchInput
                value={searchText}
                ref={inputRef}
                isValid={isValid}
                onChange={newText => setSearchText(newText)}
                onSubmit={handleSubmit}
            />
            <OptionList
                options={foundActivities}
                onClick={onPillClick}
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