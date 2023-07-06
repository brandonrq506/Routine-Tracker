import PropTypes from 'prop-types';
import styles from './TaskName.module.css';

const TaskName = ({ category, name = 'Not Set Yet', addText = '' }) => {
    return (
        <h3 className={styles[category]}>{`${addText} ${name}`}</h3>
    );
};

TaskName.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    addText: PropTypes.string,
};

export default TaskName;