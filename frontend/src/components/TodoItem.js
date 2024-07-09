import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo._id)} 
      />
      {todo.text}
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;