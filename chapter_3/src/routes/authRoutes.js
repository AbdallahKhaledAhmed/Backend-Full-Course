import { Router } from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = new Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 17);
  console.log(hashedPassword);
  // save the new user and hashed password to the db
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);
    // now that we have a user adding the default todo to it
    const defaultTodo = `Hello :) Add your first Todo`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    insertTodo.run(result.lastInsertRowid,  defaultTodo);

    // create token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(501);
  }
});
router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    if (!user) res.status(404).send({ message: "user not found!" });
    console.log(user);
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      res.status(401).send({ message: "Password incorrect" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(501);
  }
});

export default router;
