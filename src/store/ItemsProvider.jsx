import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ItemsContext from "./itemsContext";
import { parseInfo, stringifyInfo } from "../utils/localStorageUtils"

const ItemsProvider = ({ children }) => {
    //Add our state
    const [toDoList, setToDoList] = useState(parseInfo('toDoList') || []);
    const [doneList, setDoneList] = useState(parseInfo('doneList') || []);
    // const [currentToDo, setCurrentToDo] = useState(parseInfo('currentToDo') || null);

    useEffect(() => {
        stringifyInfo('toDoList', toDoList);
    }, [toDoList]);

    useEffect(() => {
        stringifyInfo('doneList', doneList);
    }, [doneList]);

    // useEffect(() => {
    //     stringifyInfo('currentToDo', currentToDo);
    // }, [currentToDo]);

    //Add our functionality (Use Reducer for more complex functionality)
    const addAsToDo = (item) => setToDoList([...toDoList, item]);
    const addAsDone = (item) => setDoneList([...doneList, item]);
    const addAsPriority = (item) => setToDoList(item, ...toDoList);
    const updateToDo = (item) => setToDoList(toDoList.map((i) => i.id === item.id ? { ...item } : i));
    const removeToDo = (id) => setToDoList(toDoList.filter((i) => i.id !== id));

    const addAsCurrTodo = () => {
        if (toDoList.length === 0) return;
        // setCurrentToDo(toDoList[0]);
        setToDoList(prevList => prevList.slice(1));
    }

    //Create our context
    const itemsContext = {
        toDoList,
        doneList,
        // currentToDo,
        addAsToDo,
        addAsCurrTodo,
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