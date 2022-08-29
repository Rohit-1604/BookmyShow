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


    let result = {};
    try {
      let query = `SELECT * FROM movies`;
      result = await client.query(query);
      console.log(result);
      res.send({
        status: "success",
        data: result.rows,
      })
    } catch (err) {
      console.error("error executing query: ", err);
      res.send({
        status: "error",
        data: err,
      })
    }
  
   
}