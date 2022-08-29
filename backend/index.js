const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

// const Movie = require("./models/movies.js");
// const MovieModel = require("./models/movies");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URLM);
app.use(bodyParser.json());
// console.log(client);
connect();
async function connect() {
  await client.connect();
}
app.get("/", function(req, res) {
  res.json({
    status: "OK",
  })
})
// Add a new movie
app.post("/add", cors(), async function (req, res) {
  console.log(req.body);
  // console.log(req.body.locations);
  let raid = Math.round(Math.random() * 6879 * (Math.random() * 98097));
  let name = req.body.name;
  let language = JSON.stringify(req.body.languages);
  let cast_team = JSON.stringify(req.body.cast);
  let genre = JSON.stringify(req.body.genre);
  let show_details = JSON.stringify(req.body.locations);
  try {
    let query = `INSERT INTO movies (raid,movie_name,languages,cast_team,genre,show_details) VALUES ('${raid}','${name}','${language}','${cast_team}','${genre}','${show_details}')`;
    const result = await client.query(query);
    console.log(result);
    res.send({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.error("error executing query: ", err);
    res.send({
      status: "error",
      data: err,
    });
  }
});

// List all movies
app.get("/list", cors(), async function (req, res) {
  result = {};
  try {
    let query = `SELECT * FROM movies`;
    result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.error("error executing query: ", err);
  }

  res.send({
    status: "success",
    data: result.rows,
  });
});

// Show Details by movie id
app.get("/details", cors(), async function (req, res) {
  let movieid = req.query.movieid;
  result = {};
  try {
    let query = `SELECT * FROM movies WHERE id=${movieid}`;
    result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.error("error executing query: ", err);
  }

  res.send({
    status: "success",
    data: result.rows,
  });
});

// Update Movie Details
app.get("/update", cors(), async function (req, res) {
  let movieid = req.query.movieid;
  let field = req.query.field;
  let fieldvalue = req.query.value;
  result = {};
  try {
    let query = `UPDATE movies SET ${field}='${fieldvalue}' WHERE id=${movieid}`;
    result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.error("error executing query: ", err);
  }

  res.send({
    status: "success",
    data: result.rows,
  });
});
app.use(
  cors({
    origin: ["*", "http://localhost:8000", "http://localhost:5500","https://bookmy-show-frontend.vercel.app"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.listen(3000);
module.exports = app ;
console.log("server started");
