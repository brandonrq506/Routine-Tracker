import PropTypes from 'prop-types';
// import styles from './SearchableList.module.css';
import { useState, useRef } from 'react';

import SearchInput from '../../UI/SearchInput/SearchInput';
import PillGroup from '../../UI/PillGroup/PillGroup';
import PillOption from '../../UI/PillOption/PillOption';

const SearchableList = ({ activities, onSubmit, maxResults = 5 }) => {
    const inputRef = useRef();
    const [searchText, setSearchText] = useState('');

    const onSelectPill = pillText => {
        setSearchText(pillText);
        inputRef.current.focus();
    }

    const transformInput = (search, activity) => ({
        searchTerm: search.toLowerCase(),
        activity: activity.toLowerCase()
    });

    const filteredResults = activities.filter(item => {
        const { searchTerm, activity } = transformInput(searchText, item.name);
        return searchTerm && activity.startsWith(searchTerm) && activity !== searchTerm;
    }).slice(0, maxResults);

    return (
        <>
            <SearchInput
                value={searchText}
                ref={inputRef}
                onChange={newText => setSearchText(newText)}
                onSubmit={onSubmit}
            />
            <PillGroup>
                {filteredResults.map(activity =>
                    <PillOption
                        key={activity.name}
                        activity={activity}
                        onClick={onSelectPill} />
                )}
            </PillGroup>
        </>
    )
}

SearchableList.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired,
    maxResults: PropTypes.number,
}

export default SearchableList;