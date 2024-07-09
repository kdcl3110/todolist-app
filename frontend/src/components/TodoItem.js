import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(todo._id);
    setOpen(false);
  };

  return (
    <ListItem 
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Todo"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this todo item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
        onChange={() => onToggle(todo._id)}
      />
      <ListItemText 
        primary={todo.text} 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} 
      />
    </ListItem>
  );
};

export default TodoItem;
