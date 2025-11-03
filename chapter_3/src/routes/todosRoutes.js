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

export default router;
