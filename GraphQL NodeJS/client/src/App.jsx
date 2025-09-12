import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";

const GET_TODOS_WITH_USER = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS_WITH_USER);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="App">
      {data.getTodos.map(todo => (
        <div key={todo.id}>
          <p>Title: {todo.title}, Status: {todo.completed ? "Done" : "Pending"}, User: {todo.user?.name || "No user"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;