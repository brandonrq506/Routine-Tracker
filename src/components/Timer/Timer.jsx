import styles from './Timer.module.css';
import { useContext } from "react";
import useTimer from "../../hooks/useTimer";
import ItemsContext from '../../store/itemsContext'
import TaskName from "./TaskName/TaskName";
import { secondsToTime } from "../../utils/timerUtils";
import { createActivity } from "../../utils/activityUtils";

const Timer = () => {
    const itemsCtx = useContext(ItemsContext);
    const currentToDo = itemsCtx.currentToDo;
    const nextTask = itemsCtx.toDoList[0];
    const { timer, start, stop } = useTimer();

    const onStart = () => {
        start(currentToDo.avgTime);
    };

    //This all should be handled in the Context.
    //I only call 'getNext' and the current is added to the done list, the information completed
    //The list updated, and the next returned. Or SOMETHING like that.
    const onNext = () => {
        stop();
        if (nextTask) start(nextTask.avgTime);
        itemsCtx.addAsDone({
            ...currentToDo,
            startTime: timer.startTime,
            endTime: timer.endTime,
            duration: timer.duration,
            isOnTime: timer.isOnTime,
        });
        itemsCtx.addAsCurrTodo();
    }

    const onPriority = value => {
        itemsCtx.addAsPriority(createActivity(value));
    }

    return (
        <div>
            <TaskName name={currentToDo?.name} category={currentToDo?.category} />
            <p>{secondsToTime(timer.secondsLeft)}</p>
            {/* <p>{timer.percentage}%</p> */}
            <div>
                <div>
                    {timer.percentage}%
                </div>
                <label>
                    <progress value={timer.percentage} max="100" />
                </label>
            </div>
            {!timer.isRunning && <button disabled={!itemsCtx.currentToDo} onClick={onStart}>Start</button>}
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