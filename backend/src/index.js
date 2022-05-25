const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./app");
const app = express();


app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(indexRouter);

module.exports = app;