import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

const baseUrl = "http://localhost:5000";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/todos`)
      .then((response) => setTodos(response.data))
      .catch((error) =>
        console.error("There was an error fetching the todos!", error)
      );
  }, []);

  const addTodo = () => {
    axios
      .post(`${baseUrl}/todos`, { text: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
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
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
