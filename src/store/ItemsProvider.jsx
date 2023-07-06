import PropTypes from "prop-types";
import { useState } from "react";
import ItemsContext from "./itemsContext";

const ItemsProvider = ({ children }) => {
    //Add our state
    const [toDoList, setToDoList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    //Add our functionality (Use Reducer for more complex functionality)
    const addAsToDo = (item) => setToDoList([...toDoList, item]);
    const addAsDone = (item) => setDoneList([...doneList, item]);
    const addAsPriority = (item) => setToDoList([toDoList[0], item, ...toDoList.slice(1)]);
    const updateToDo = (item) => setToDoList(toDoList.map((i) => i.id === item.id ? { ...item } : i));
    const removeToDo = (id) => setToDoList(toDoList.filter((i) => i.id !== id));

    //Create our context
    const itemsContext = {
        toDoList,
        doneList,
        addAsToDo,
        addAsDone,
        addAsPriority,
        updateToDo,
        removeToDo,
    };

    //Return our provider
    return (
        <ItemsContext.Provider value={itemsContext}>
            {children}
        </ItemsContext.Provider>
    );
};

ItemsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ItemsProvider;