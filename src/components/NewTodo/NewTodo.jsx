import classes from './NewTodo.module.css';

import { v4 as uuidv4 } from "uuid";
import { getActivity, findAvgTime, findCategory } from '../../utils/activityUtils'
import { useContext } from 'react';
import ItemsContext from '../../store/itemsContext';
import useInput from '../../hooks/useInput';

const NewToDo = () => {
    const { addAsToDo } = useContext(ItemsContext);

    const {
        value: todo,
        isValid: todoIsValid,
        hasError: todoHasError,
        valueChangeHandler: todoChangeHandler,
        inputBlurHandler: todoBlurHandler,
        reset: todoReset
    } = useInput(input => !!getActivity(input));

    const submitHandler = (event) => {
        event.preventDefault();
        if (!todoIsValid) {
            //Todo: Do something when form is not valid.
            return;
        }

        addAsToDo({
            id: uuidv4(),
            name: todo,
            category: findCategory(todo),
            avgTime: findAvgTime(todo),
        });

        todoReset();
    }

    const todoClasses = `${classes.formControl} ${todoHasError && classes.invalid}`;
    return (
        <form onSubmit={submitHandler}>
            <div className={classes.controlGroup}>
                <div className={todoClasses}>
                    <label htmlFor="todo">To Do</label>
                    <input
                        id="todo"
                        type="text"
                        placeholder='Make Bed...'
                        value={todo}
                        onChange={todoChangeHandler}
                        onBlur={todoBlurHandler} />
                    {todoHasError && todo === '' && <p className={classes.errorText}>To-Do must not be empty</p>}
                    {todoHasError && todo !== '' && <p className={classes.errorText}>Not a valid To-Do</p>}
                </div>
                <div className={classes.formActions}>
                    <button disabled={todoHasError} type="submit">Add To-do</button>
                </div>
            </div>
        </form>
    );
};

export default NewToDo;

/**
 * 
 * Todo:
 * Add auto-complete functionality to the <Input/>
 * Implement MUI autocomplete component
 * 
 *  
 * I have a problem with state and <select/>. You may have a default value, but that value is default on the <select/>
 * not on the state, so if you don't touch it and  you try to submit, your state will be empty.
 * Maybe a better way to do this is adjust the hook to use useRef instead of useState?
 * 
 * I don't need a Time input. Time matters in excel because I record manually when I start.
 * However, in this application I add all my To-dos and they start when I press the 'Next' button.
 * Here what really matters (Which happens in the logic) is the average time for the task
 * Which we will calculate based on a lookup table somewhere.
 */