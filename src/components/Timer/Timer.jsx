// import styles from './Timer.module.css';
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
        if (!nextTask) stop();

        start(nextTask?.avgTime);
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
            {isRunning && <button onClick={handleNextTask}>Next</button>}
            <h2>Next Task: {nextTask?.name || 'No more tasks'}</h2>
        </>
    );
};

export default Timer;