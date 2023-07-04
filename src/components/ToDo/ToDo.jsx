import styles from './ToDo.module.css';
import { useContext } from "react";
import ItemsContext from "../../store/itemsContext";

import activityLookup from '../../store/activityLookup';
import TodoList from './TodoList/TodoList';
import SearchableList from './SearchableList/SearchableList';

const ToDo = () => {
    const { toDoList, addAsToDo } = useContext(ItemsContext);

    return (
        <div className={styles.todo}>
            <SearchableList activities={activityLookup} onSubmit={addAsToDo} />
            <TodoList toDos={toDoList} header="No To-Dos available" />
        </div>
    );
};

export default ToDo;