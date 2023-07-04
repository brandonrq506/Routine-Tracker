import PropTypes from 'prop-types';
import styles from './PillOption.module.css';
import { proper } from '../../../utils/stringUtils';

const PillOption = ({ activity, onClick }) => {
    const classes = `${styles.pill} ${styles[activity.category]}`
    return (
        <button className={classes} onClick={() => onClick(activity.name)}>
            {proper(activity.name)}
        </button>
    );
};

PillOption.propTypes = {
    activity: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PillOption;