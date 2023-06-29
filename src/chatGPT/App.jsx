// App.js
import { ToDoProvider } from './ToDoContext';
import Timer from './Timer';

const App = () => {
    return (
        <ToDoProvider>
            <Timer />
            {/* more components can be added here */}
        </ToDoProvider>
    );
};

export default App;
