import express from "express";
const app = express();
const port = 6969;
app.use(express.json());

const users = [{ name: "Abdallah" }];

app.get("/", (req, res) => {
  res.send("<h1>Home</h1><input/> <a href='/dashboard'>Dashboard</a>");
});
app.get("/dashboard", (req, res) => {
  res.send("<h1>Dashboard</h1><input/> <a href='/'>Home</a>");
});
app.get("/api/users", (req, res) => {
  res.send(`<body><p>${JSON.stringify(users)} </p></body>`);
});
app.post("/api/data", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.status(201);
  res.end();
});

app.listen(port, () => {
  console.log("Server Running on port : " + port);
});
