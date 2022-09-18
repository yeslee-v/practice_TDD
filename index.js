const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const user = require("./api/user");

// middleware
if (process.env.NODE_ENV !== "test") app.use(morgan("dev")); // server log 측정
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/users", user);

module.exports = app;
