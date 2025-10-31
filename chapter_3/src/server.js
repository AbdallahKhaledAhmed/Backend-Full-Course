import express from "express";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import authRouter from "./routes/authRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(dirname(__dirname), "public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.use("/auth", authRouter);

app.listen(port, () => console.log("Server running on port =>", port));
