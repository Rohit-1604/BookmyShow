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
    origin: ['*','https://bookmy-show-frontend.vercel.app','http://localhost:5500','http://127.0.0.1:5500'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  try{
    await client.connect();
  } catch (err) {
    console.log(err);
  }

    let movieid = req.query.movieid;
  let field = req.query.field;
  let fieldvalue = req.query.value;
  let result = {};
  try {
    let query = `UPDATE movies SET ${field}='${fieldvalue}' WHERE id=${movieid}`;
    result = await client.query(query);
    console.log(result);
    res.json({
      status: "success",
      data: result,
    })
  } catch (err) {
    console.error("error executing query: ", err);
    res.json({
      status: "error",
      data: err,
    })
  }

;
}