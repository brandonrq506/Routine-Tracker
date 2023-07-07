import PropTypes from 'prop-types'
import styles from './TodoItem.module.css';

import DeleteButton from './DeleteButton';

const TodoItem = ({ toDo }) => {
    return (
        <li className={`${styles.todoElement} ${styles[toDo.category]}`}>
            <div className={styles.description}>
                <p className={styles.avgTime}>{toDo.avgTime ?? '*'}</p>
                <h4 className={styles.name}>{toDo.name}</h4>
            </div>
            <DeleteButton id={toDo.id} />
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