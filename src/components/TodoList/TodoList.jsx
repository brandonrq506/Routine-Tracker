import styles from './TodoList.module.css';
import { useContext } from "react";
import ItemsContext from "../../store/itemsContext";
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
    const { toDoList } = useContext(ItemsContext);
    const toDoItems = toDoList.map(todo => <TodoItem key={todo.id} toDo={todo} />);

    return (
        <section>
            <ul className={styles.list}>
                {toDoItems}
            </ul>
        </section>
    );
};

export default TodoList;