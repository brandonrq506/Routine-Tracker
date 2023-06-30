// import styles from './Timer.module.css';
import { useContext } from 'react';
import useTimer from '../../hooks/useTimer';
import ItemsContext from '../../store/itemsContext'

const Timer = () => {
    const itemsCtx = useContext(ItemsContext);
    const currentTask = itemsCtx.toDoList[0];
    const { timeLeft, percentage, metaData, isRunning, start, stop } = useTimer();

    const onStart = () => {
        start(currentTask.avgTime);
    }

    const nextTask = () => {
        start(itemsCtx.toDoList[1]?.avgTime);
        if (!itemsCtx.toDoList[1]) stop();
        itemsCtx.addAsDone({ ...currentTask, ...metaData });
        itemsCtx.removeToDo(currentTask.id);
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
            {isRunning && <button onClick={nextTask}>Next</button>}
            <h2>Next Task: {itemsCtx.toDoList[1]?.name || 'No more tasks'}</h2>
        </>
    );
};

export default Timer;