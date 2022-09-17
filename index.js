const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000;
var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));

app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  // id가 같지 않은 user만 기존의 users 객체에 넣어준다
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
