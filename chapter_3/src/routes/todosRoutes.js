import { Router } from "express";
import db from "../db.js";
import { todo } from "node:test";

const router = new Router();

router.get("/", (req, res) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = (?)`);
  const todos = getTodos.all(req.userId);
  if (!todos) res.send({});
  res.send(todos);
});

router.post("/", (req, res) => {
  const { task } = req.body;
  const addTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
  const result = addTodo.run(req.userId, task);
  res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 });
});

router.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  const removeTodo = db.prepare(
    `DELETE FROM todos WHERE user_id = ? AND id = ?`
  );
  const result = removeTodo.run(req.userId, todoId);
  res.status(201).send(result);
});

router.put("/:id", (req, res) => {
  const {id} = req.params;
  const editTodo = db.prepare(
    `UPDATE todos
    SET completed = ?
    WHERE user_id = ? AND id = ?`
  );
  const result = editTodo.run(1, req.userId, id);
  res.status(201).send(result);
});

export default router;
