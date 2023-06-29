// components/Timer.js
import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from './ToDoContext';
import useTimer from './useTimer';

const Timer = () => {
    const { toDoList, doneList, markAsDone, removeToDo } = useContext(ToDoContext);
    const [currentTask, setCurrentTask] = useState(toDoList[0]);

    const { seconds, isActive, setIsActive } = useTimer(currentTask?.avgTime || 0, currentTask);

    useEffect(() => {
        if (toDoList.length > 0) {
            setCurrentTask(toDoList[0]);
        } else {
            setCurrentTask(null);
        }
    }, [toDoList]);

    const finishTask = () => {
        if (currentTask) {
            const duration = currentTask.avgTime - seconds;
            markAsDone(currentTask, duration);
            removeToDo(currentTask);
        }
    };

    const nextTask = () => {
        finishTask();
    };

    // If no current task is set, show a message indicating all tasks are done
    if (!currentTask) {
        return <h1>All tasks are done!</h1>;
    }

    return (
        <>
            <h1>{currentTask.name}</h1>
            <h2>Time left: {seconds}</h2>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={nextTask}>Next</button>
            <h2>Next Task: {toDoList[1]?.name || 'No more tasks'}</h2>
        </>
    );
};


export default Timer;