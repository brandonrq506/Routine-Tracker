import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ItemsContext from "./itemsContext";
import { parseInfo, stringifyInfo } from "../utils/localStorageUtils"

const ItemsProvider = ({ children }) => {
    //Add our state
    const [toDoList, setToDoList] = useState(parseInfo('toDoList') || []);
    const [doneList, setDoneList] = useState(parseInfo('doneList') || []);
    const [currentToDo, setCurrentToDo] = useState(parseInfo('currentToDo') || null);

    useEffect(() => {
        stringifyInfo('toDoList', toDoList);
    }, [toDoList]);

    useEffect(() => {
        stringifyInfo('doneList', doneList);
    }, [doneList]);

    useEffect(() => {
        stringifyInfo('currentToDo', currentToDo);
    }, [currentToDo]);

    const addToDo = (item) => setToDoList(prevList => [...prevList, item]);
    const addAsDone = (item) => setDoneList(prevList => [...prevList, item]);
    const addAsPriority = (item) => setToDoList(prevList => [item, ...prevList]);
    const updateToDo = (item) => setToDoList(prevList => prevList.map((i) => i.id === item.id ? { ...item } : i));
    const removeToDo = (id) => setToDoList(prevList => prevList.filter((i) => i.id !== id));
    const editCurrTodo = (item) => setCurrentToDo(item);

    /*     
        //I need a proper method that gets me the nextTodo and sets it as currentTodo

        So I can do:
    const onNext = () => {
        stop();
        if (itemsCtx.hasNext) {
            const nextToDo = itemsCtx.getNext();
            const startTime = start(nextTask.avgTime);
            itemsCtx.editCurrTodo({
                ...nextToDo,
                startTime,
            });
        }
        itemsCtx.addAsDone({
            ...currentToDo,
            startTime: timer.startTime,
            endTime: timer.endTime,
            duration: timer.duration,
            isOnTime: timer.isOnTime,
        });

        //I still need to figure out how to do this.
        //I really need a good interface for the itemsContext
        itemsCtx.addAsCurrTodo();
    }
    */

    const addAsCurrTodo = () => {
        if (toDoList.length === 0) {
            setCurrentToDo(null);
            return;
        }

        setCurrentToDo({ ...toDoList[0], startTime: new Date() });
        setToDoList(prevList => prevList.slice(1));
    }

    const addAsToDo = item => {
        if (!currentToDo) {
            setCurrentToDo(item);
            return;
        }
        addToDo(item);
    }

    //Create our context
    const itemsContext = {
        toDoList,
        doneList,
        currentToDo,
        addAsToDo,
        addAsCurrTodo,
        editCurrTodo,
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
/* 
ALL of this needs to be refactored. I must create an interface that facilitates interacting with this
without having to worry about all the implementation details. Order of updates, etc.


hasNextTodo: () => toDoList.length > 0;

*/