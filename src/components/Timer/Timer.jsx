import styles from './Timer.module.css';
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import useTimer from "../../hooks/useTimer";
import ItemsContext from '../../store/itemsContext'
import TaskName from "./TaskName/TaskName";
import { secondsToTime } from "../../utils/timerUtils";
import { proper } from "../../utils/stringUtils";
import { findAvgTime, findCategory } from "../../utils/activityUtils";

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

    const onPriority = value => {
        itemsCtx.addAsPriority(
            {
                id: uuidv4(),
                name: proper(value),
                category: findCategory(value),
                avgTime: findAvgTime(value),
            }
        );
    }

    if (itemsCtx.toDoList.length === 0)
        return <h1>No To-Dos left</h1>;

    if (!timer.isRunning)
        return <button onClick={onStart}>Start</button>


    return (
        <div>
            <TaskName name={currentTask.name} category={currentTask.category} />
            <p>{secondsToTime(timer.secondsLeft)}</p>
            <p>{timer.percentage}%</p>
            {timer.isRunning && <button className={styles.actionButton} onClick={onNext}>Next</button>}
            {timer.isRunning && <button className={styles.actionButton} onClick={() => onPriority('Break')}>Break</button>}
            <TaskName name={nextTask?.name} category={nextTask?.category} addText='Next Task:' />
        </div>
    );
};

export default Timer;


/* 
I want the onPriority to be set from a config pannel.
I want the onPriority to pass a dinamic function based on buttonText. event.value.innerHTML I belive.
Maybe I can wrap this component in a <Card/> style component.
*/