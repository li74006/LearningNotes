import { Link } from "react-router-dom";
import TodoList from "../react-query/TodoList";
import TodoForm from "../react-query/TodoForm";
import PostList from "../react-query/PostList";
import Counter from "../state-management/counter/Counter";

const HomePage = () => {
  return (
    <>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, mollitia!</p>
      <Link to="/users">Users</Link>
      <Counter />
      <TodoForm />
      <TodoList />
      <PostList />
    </>
  );
};

export default HomePage;
