// models/Task.js
class Task {
    constructor(name, category, avgTime) {
        this.name = name;
        this.category = category;
        this.avgTime = avgTime;
    }
}

// context/ToDoContext.js
import { createContext, useState } from 'react';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    const [toDoList, setToDoList] = useState([
        new Task('Wash dishes', 'home', 300),
        new Task('Do laundry', 'home', 600),
        new Task('Buy groceries', 'home', 1800),
    ]);
    const [doneList, setDoneList] = useState([]);
    console.log(doneList);
    const addToDo = (task) => {
        setToDoList([...toDoList, task]);
    };

    const markAsDone = (task, duration) => {
        const updatedTask = { ...task, duration };
        setDoneList([...doneList, updatedTask]);
    };

    const removeToDo = (task) => {
        setToDoList(toDoList.filter(t => t !== task));
    };

    return (
        <ToDoContext.Provider value={{ toDoList, doneList, addToDo, markAsDone, removeToDo }}>
            {children}
        </ToDoContext.Provider>
    );
};
