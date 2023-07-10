import { createContext } from "react";

const ItemsContext = createContext({
    toDoList: [],
    doneList: [],
    // currentToDo: null,
    addAsToDo: () => { },
    addAsCurrTodo: () => { },
    addAsDone: () => { },
    addAsPriority: () => { },
    updateToDo: () => { },
    removeToDo: () => { },
});

export default ItemsContext;