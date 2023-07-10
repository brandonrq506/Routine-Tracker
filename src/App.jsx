import ToDo from "./components/ToDo/ToDo";
import Timer from "./components/Timer/Timer";
import DoneList from "./components/DoneList/DoneList";

const App = () => {

    return (
        <>
            <ToDo />
            <Timer />
            <DoneList />
            <button onClick={() => localStorage.clear()}>Clear Local Storage</button>
        </>
    );
};

export default App;

/*
Hey, you are a senior react developer, known for following only the best practices like composition, single responsibility principle, separation of concerns, inmutability, etc.

You have been tasked to build a Routine tracker. This routine tracker will allow users to input a list of to-do items and you start and finish a to-do item by pressing a button. Once you have pressed the button to finish that item, it will be moved to a 'done' array.

Tracker will have a simple input screen where you can enter your new Tasks. Input will consist of one <Input/> type text for the Activity Name. The activity 'Category' and 'AvgTime' will be inferred from a LookUp table.

When a task is in the 'To-do' array, it has the following properties:
id: UUIDV4
name: The name of the task.
category: Can be one of the following 'Wellness','Neceesary','Productive' or 'Procrastinate'.
avgTime: Average Time to perform the activity.

Once a Task is submitted, we should have a list displaying all the items in the to-do list.
Each Task should have an option to edit or delete. When click on editing, a 'editing form' should appear allowing the user to change the activity name, must include all verification to ensure only valid inputs are recevied.

When there are no tasks in the To-Do array, the timer only shows that there is nothing.
When there is 1 task in the To-Do array, the timer shows the task but shows nothing is next
When there are 2 or more tasks in the To-Do array, the timer shows the task and the next task in queue.


When a task is put in the 'done' array, it will have the name, category, avgTime, and the total duration between start and finish time. (May include a 'result' property based on whether we finised the task with time to spare, at time or late)

Now, one of the most important components is the Timer. the timer will be how the user mainly interacts with the app.
When the user chose to start, the timer loads the first item in the 'to-do' list, shows the name in a h1, shows the time left to complete the task (time left based on avgTime), it also shows an option to move on to the next item (when this is pressed, the current task is considered completed and is moved to the 'done' list). And at the bottom it shows the next task in queue.


Methods to the list should include:


addAsToDo()
addAsDone()
addAsPriority()
removeToDo()
*/
