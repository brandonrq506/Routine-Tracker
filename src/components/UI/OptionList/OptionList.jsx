import PropTypes from 'prop-types';
import styles from './OptionList.module.css';
import PillOption from '../PillOption/PillOption';

const OptionList = ({ options, onClick, defaultOptions = [] }) => {
    const pills = options.length === 0 ? defaultOptions : options;

    return (
        <ul className={styles.optionGroup}>
            {pills.map(activity =>
                <PillOption
                    key={activity.name}
                    activity={activity}
                    onClick={onClick} />
            )}
        </ul>
    );
};

OptionList.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
    defaultOptions: PropTypes.arrayOf(PropTypes.object),
};

export default OptionList;