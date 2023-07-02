// import styles from './Timer.module.css';
import { v4 as uuidv4 } from "uuid";
import { findAvgTime, findCategory } from '../../utils/activityUtils'
import { proper } from '../../utils/stringUtils';
import { useContext } from 'react';
import useTimer from '../../hooks/useTimer';
import ItemsContext from '../../store/itemsContext'

const Timer = () => {
    const itemsCtx = useContext(ItemsContext);
    const [currentTask, nextTask] = itemsCtx.toDoList;
    const { timeLeft, percentage, metaData, isRunning, start, stop } = useTimer();

    const onStart = () => {
        start(currentTask.avgTime);
    }

    const handleNextTask = () => {
        stop();

        if (nextTask) {
            start(nextTask.avgTime);
        }

        itemsCtx.addAsDone({ ...currentTask, ...metaData, endTime: new Date() });
        itemsCtx.removeToDo(currentTask.id);
    }

    /**
     * This does not work as addAsPriority inserts the item at the start of the array
     * And the start of the array is our currentTask.
     * Ideally we would insert the element as the second element of the array. So it is
     * out next task in queue.
     * To make this work we either update the addAsPriority function, or change how we
     * handle our currentTask.
     * We could potencially remove the currentTask from the to-do list and have it in a
     * intermediary state.
    */
    const handlePriority = (event) => {
        const todo = event.target.innerHTML
        itemsCtx.addAsPriority({
            id: uuidv4(),
            name: proper(todo),
            category: findCategory(todo),
            avgTime: findAvgTime(todo),
        });
    }



    if (itemsCtx.toDoList.length === 0) {
        return <h1>No To-Dos left</h1>;
    }

    if (!isRunning)
        return <button onClick={onStart}>Start</button>

    return (
        <>
            <h1>{currentTask.name}</h1>
            <p>{timeLeft}</p>
            <p>{percentage}%</p>
            <p>{metaData.duration}</p>
            {isRunning && <button onClick={handleNextTask}>Next</button>}
            {isRunning && <button onClick={handlePriority}>Break</button>}
            <h2>Next Task: {nextTask?.name || 'No more tasks'}</h2>
        </>
    );
};

export default Timer;