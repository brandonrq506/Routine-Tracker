import PropTypes from 'prop-types'
import styles from './TodoItem.module.css';

const TodoItem = ({ toDo, children }) => {
    return (
        <li className={`${styles.activity} ${styles[toDo.category]}`}>
            <p className={styles.avgTime}>{toDo.avgTime ?? '*'}</p>
            <h4 className={styles.name}>{toDo.name}</h4>
            <div>
                {children}
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    toDo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        avgTime: PropTypes.number,
    }),
    children: PropTypes.node,
};

export default TodoItem;