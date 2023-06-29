import PropTypes from 'prop-types'
import styles from './TodoItem.module.css';
import DeleteButton from './DeleteButton';

const TodoItem = ({ toDo }) => {
    return (
        <li className={`${styles.activity} ${styles[toDo.category]}`}>
            <p className={styles.avgTime}>{toDo.avgTime ?? '*'}</p>
            <h4 className={styles.name}>{toDo.name}</h4>
            <div>
                {<DeleteButton itemId={toDo.id} />}
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
    })
};

export default TodoItem;