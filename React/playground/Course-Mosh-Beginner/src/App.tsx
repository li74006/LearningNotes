import { useState } from "react";
import useUsers from "./hooks/useUsers";
import { Genre } from "./../../Exercise-Mosh/src/hooks/useGenres";

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
