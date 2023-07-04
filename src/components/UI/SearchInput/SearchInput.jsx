import PropTypes from 'prop-types';
import styles from './SearchInput.module.css';

import { forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getActivity } from '../../../utils/activityUtils';
import { proper } from '../../../utils/stringUtils';
import { findCategory, findAvgTime } from '../../../utils/activityUtils';

const SearchInput = forwardRef(function SearchInput(props, ref) {
    const value = props.value;
    const isValid = !!getActivity(value);
    const isEmpty = value.trim() === '';

    const onSubmitHandler = event => {
        event.preventDefault();
        if (!isValid) return;

        props.onSubmit({
            id: uuidv4(),
            name: proper(value),
            category: findCategory(value),
            avgTime: findAvgTime(value),
        });

        props.onChange('');
    };

    const classes = `${styles.formControl} ${(!isValid && isEmpty) ? '' : styles.invalid}`;
    return <form onSubmit={onSubmitHandler}>
        <input
            className={classes}
            type="text"
            id='searchInput'
            name='searchInput'
            value={value}
            ref={ref}
            placeholder='Search Activity...'
            onChange={event => props.onChange(event.target.value)}
        />
    </form>
});

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;