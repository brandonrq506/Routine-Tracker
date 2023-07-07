import PropTypes from 'prop-types';
import styles from './DoneItem.module.css';
import { secondsToTime, secondsToMinutes } from '../../utils/timerUtils';

const DoneItem = ({ doneItem }) => {
    const font_size = 15;
    const height = secondsToMinutes(doneItem.duration);

    const style = {
        fontSize: `${font_size}px`,
        height: `${height}px`,
    };

    const content = height > font_size && (
        <>
            <p>{doneItem.name}</p>
            <p>{secondsToTime(doneItem.duration)}</p>
            <p>{doneItem.startTime.toLocaleTimeString('en-US')}</p>
            <p>{doneItem.endTime.toLocaleTimeString('en-US')}</p>
        </>
    )

    return (
        <li className={styles.doneItem}>
            <div style={style} className={`${styles.activity} ${styles[doneItem.category]}`}>
                {content}
            </div>
        </li>
    );
};


DoneItem.propTypes = {
    doneItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        startTime: PropTypes.instanceOf(Date).isRequired,
        endTime: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
};

export default DoneItem;