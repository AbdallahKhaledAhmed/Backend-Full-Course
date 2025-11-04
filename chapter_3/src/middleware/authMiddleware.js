import jwt from "jsonwebtoken";
import db from "../db.js";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No Token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const getUser = db.prepare(`SELECT * FROM users WHERE id = (?)`);
    const user = getUser.get(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default authMiddleware;
