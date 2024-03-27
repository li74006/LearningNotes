import "./App.css";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import AuthProvider from "./state-management/auth/AuthProvider";
import { TasksProvider } from "./state-management/tasks";
import Counter from "./state-management/counter/Counter";
import TodoList from "./react-query/TodoList";
import TodoForm from "./react-query/TodoForm";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Counter />
        <NavBar />
        <HomePage />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
