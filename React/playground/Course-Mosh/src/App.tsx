import useUsers from "./hooks/useUsers";

interface User {
  id: number;
  name: string;
}

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
