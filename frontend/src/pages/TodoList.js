import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import { Container, Typography, TextField, Button, List } from "@mui/material";

const baseUrl = "http://localhost:5000";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/todos`)
      .then((response) => setTodos(response.data))
      .catch((error) =>
        console.error("There was an error fetching the todos!", error)
      );
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      setError("Todo text cannot be empty");
      return;
    }

    axios
      .post(`${baseUrl}/todos`, { text: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
        setError("");
      })
      .catch((error) =>
        console.error("There was an error adding the todo!", error)
      );
  };

  const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios
      .put(`${baseUrl}/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      })
      .catch((error) =>
        console.error("There was an error toggling the todo!", error)
      );
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${baseUrl}/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) =>
        console.error("There was an error deleting the todo!", error)
      );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Todo List
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <TextField
          label="Add a new todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Todo
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
