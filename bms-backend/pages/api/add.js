const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URLM);
import NextCors from 'nextjs-cors';



export default async function (req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['*','https://bookmy-show-frontend.vercel.app'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  try{
    await client.connect();
  } catch (err) {
    console.log(err);
  }

    console.log(req.body);
  // console.log(req.body.locations);
  let raid = Math.round(Math.random() * 6879 * (Math.random() * 98097));
  let name = req.body.name;
  let language = JSON.stringify(req.body.languages);
  let cast_team = JSON.stringify(req.body.cast);
  let genre = JSON.stringify(req.body.genre);
  let show_details = JSON.stringify(req.body.locations);
  let result = {}
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