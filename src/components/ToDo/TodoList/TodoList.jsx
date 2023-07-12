import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ toDos, header }) => {
    const count = toDos.length;
    let heading = header;
    if (count > 0) {
        const noun = count === 1 ? 'To-Do' : 'To-Dos';
        heading = `${count} ${noun}`;
    }

    return (
        <>
            <h2>{heading}</h2>
            {toDos.map(todo =>
                <TodoItem key={todo.id} toDo={todo} />
            )}
        </>
    );
};

TodoList.propTypes = {
    toDos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        avgTime: PropTypes.number,
    })).isRequired,
    header: PropTypes.string.isRequired,
};

export default TodoList;