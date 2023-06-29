import ItemsProvider from './store/ItemsProvider'
import NewToDo from "./components/NewToDo/NewToDo";
import TodoList from './components/TodoList/TodoList';

const App = () => {
    return (
        <>
            <ItemsProvider>
                <NewToDo />
                <TodoList />
            </ItemsProvider>
        </>
    );
};

export default App;

/*
Hey, you are a senior react developer, known for following only the best practices like composition, single responsibility principle, separation of concerns, inmutability, etc.

You have been tasked to build a Routine tracker. This routine tracker will allow users to input a list of to-do items and you start and finish a to-do item by pressing a button. Once you have pressed the button to finish that item, it will be moved to a 'done' array.

When a task is in the 'To-do' array, it has the following properties:
name: The name of the task.
category: Can be one of the following 'Wellness','Neceesary','Productive' or 'Procrastinate'.
avgTime: Average Time to perform the activity.

Once a Task is submitted, we should have a list displaying all the items in the to-do list.
Each Task should have an option to be edited or deleted. In the case of editing, the user should be able to edit the name and category only.

When a task is put in the 'done' array, it will have the name, category, avgTime, and the total duration between start and finish time. (May include a 'result' property based on whether we finised the task with time to spare, at time or late)

Now, one of the most important components is the Timer. the timer will be how the user mainly interacts with the app.
When the user chose to start, the timer loads the first item in the 'to-do' list, shows the name in a h1, shows the time left to complete the task (time left based on avgTime), it also shows an option to move on to the next item (when this is pressed, the current task is considered completed and is moved to the 'done' list). And at the bottom it shows the next task in queue.


Methods to the list should include:


addAsToDo()
addAsDone()
addAsPriority()
removeToDo()
*/
