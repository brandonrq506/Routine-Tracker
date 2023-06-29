import { createContext } from "react";

const ItemsContext = createContext({
    toDoList: [],
    doneList: [],
    addAsToDo: () => { },
    addAsDone: () => { },
    addAsPriority: () => { },
    updateToDo: () => { },
    removeToDo: () => { },
});

export default ItemsContext;