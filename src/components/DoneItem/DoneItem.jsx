import PropTypes from 'prop-types';
import styles from './DoneItem.module.css';

const DoneItem = ({ doneItem }) => {
    const font_size = 15;
    const height = doneItem.duration;
    // Does not work because doneItem.duration is a string. hh:mm:ss
    // Again, revisit the idea to handle everything in seconds.
    // And display information with helper functions.

    const style = {
        fontSize: `${font_size}px`,
        height: `${height}px`,
    };

    return (
        <li style={style}>
            <div className={`${styles.activity} ${styles[doneItem.category]}`}>
                <p>{doneItem.name}</p>
                <p>{doneItem.duration}</p>
                <p>{doneItem.startTime.toLocaleTimeString('en-US')}</p>
                <p>{doneItem.endTime.toLocaleTimeString('en-US')}</p>
            </div>
        </li>
    );
};

DoneItem.propTypes = {
    doneItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        startTime: PropTypes.instanceOf(Date).isRequired,
        endTime: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
};

export default DoneItem;