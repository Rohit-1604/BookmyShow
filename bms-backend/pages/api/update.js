const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URLM);



export default async function (req, res) {
  try{
    await client.connect();
  } catch (err) {
    console.log(err);
  }

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
}