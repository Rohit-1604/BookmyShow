const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URLM);



export default async function (req, res) {
    await client.connect();

    let result = {};
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
    })
}