import PropTypes from 'prop-types';
import styles from './PillGroup.module.css';

const PillGroup = ({ children }) => {
    return (
        <ul className={styles.pillGroup}>
            {children}
        </ul>
    );
};

PillGroup.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default PillGroup;