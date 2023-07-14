import PropTypes from 'prop-types';
import styles from './SearchInput.module.css';
import { forwardRef } from 'react';

const SearchInput = forwardRef(function SearchInput({ value, isValid, onChange, onSubmit }, ref) {
    const isEmpty = value.trim() === '';

    const onSubmitHandler = event => {
        event.preventDefault();
        isValid && onSubmit(value)
    };

    //If is empty AND isNOTvalid, then styling-wise it should be valid.
    const classes = `${styles.formControl} ${(isEmpty && !isValid) ? '' : styles.invalid}`;
    return <form onSubmit={onSubmitHandler}>
        <input
            className={classes}
            type="text"
            id='searchInput'
            name='searchInput'
            value={value}
            ref={ref}
            placeholder='Search Activity...'
            onChange={event => onChange(event.target.value)}
        />
    </form>
});

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;