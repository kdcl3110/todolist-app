const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post("/", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

router.put("/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

module.exports = router;
