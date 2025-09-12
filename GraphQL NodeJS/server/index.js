import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import axios from 'axios';

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
      }

      type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        userId: ID!
        user: User
      }

      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
            return data;
          } catch (err) {
            console.error(err);
            return null;
          }
        }
      },
      Query: {
        getTodos: async () => {
          try {
            const { data: todos } = await axios.get('https://jsonplaceholder.typicode.com/todos');
            const userIds = [...new Set(todos.map(t => t.userId))];

            const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = usersResponse.data;

            // Attach user objects to todos
            return todos.map(todo => ({
              ...todo,
              user: users.find(u => u.id === todo.userId)
            }));
          } catch (err) {
            console.error(err);
            return [];
          }
        },
        getAllUsers: async () => {
          try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
            return data;
          } catch (err) {
            console.error(err);
            return [];
          }
        },
        getUser: async (parent, { id }) => {
          try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            return data;
          } catch (err) {
            console.error(err);
            return null;
          }
        }
      }
    }
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, {
    context: async () => ({})
  }));

  app.listen(8000, () => console.log('Server started at http://localhost:8000/graphql'));
}

startServer();