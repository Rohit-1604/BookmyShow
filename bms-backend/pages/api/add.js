const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URLM);



export default async function (req, res) {
    await client.connect();

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
}