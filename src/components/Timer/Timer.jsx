// import styles from './Timer.module.css';
import { useContext } from "react";
import useTimer from "../../hooks/useTimer";
import ItemsContext from '../../store/itemsContext'
import { secondsToTime } from "../../utils/timerUtils";

const Timer = () => {
    const itemsCtx = useContext(ItemsContext);
    const [currentTask, nextTask] = itemsCtx.toDoList;
    const { timer, start, stop } = useTimer();

    const onStart = () => start(currentTask.avgTime);

    const onNext = () => {
        stop();
        if (nextTask) start(nextTask.avgTime);
        itemsCtx.addAsDone({
            ...currentTask,
            startTime: timer.startTime,
            endTime: timer.endTime,
            duration: timer.duration,
        });
        itemsCtx.removeToDo(currentTask.id);
    }

    if (itemsCtx.toDoList.length === 0)
        return <h1>No To-Dos left</h1>;

    if (!timer.isRunning)
        return <button onClick={onStart}>Start</button>


    return (
        <div>
            <h1>{currentTask.name}</h1>
            <p>{secondsToTime(timer.secondsLeft)}</p>
            <p>{timer.percentage}%</p>
            <p>{secondsToTime(timer.duration)}</p>
            {timer.isRunning && <button onClick={onNext}>Next</button>}
            {timer.isRunning && <button onClick={() => { }}>Break</button>}
            <h2>Next Task: {nextTask?.name || 'No more tasks'}</h2>
        </div>
    );

    /*
<TaskName activity={currentTask} />
<ProgressCircle percentage={timer.percentage}>
    <p>{secondsToTime(timer.secondsLeft)}</p>
</ProgressCircle>
<p>{secondsToTime(timer.duration)}</p>
<TaskName activity={nextTask} />
*/
};

export default Timer;