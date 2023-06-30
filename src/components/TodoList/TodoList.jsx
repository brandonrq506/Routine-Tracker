import styles from './TodoList.module.css';
import { useContext } from "react";
import ItemsContext from "../../store/itemsContext";
import TodoItem from '../TodoItem/TodoItem';
import DeleteButton from '../TodoItem/DeleteButton';

const TodoList = () => {
    const { toDoList, removeToDo } = useContext(ItemsContext);

    const toDoItems = toDoList.map(todo =>
        <TodoItem key={todo.id} toDo={todo}>
            <DeleteButton onDelete={removeToDo.bind(null, todo.id)} />
        </TodoItem>);

    return (
        <section>
            <ul className={styles.list}>
                {toDoItems}
            </ul>
        </section>
    );
};

export default TodoList;