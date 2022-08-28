const express = require('express')
const app = express()
const Movie = require("./models/movies.js")
const path = require('path')
const expressHandlerbars = require("express-handlebars")
const bodyParser = require("body-parser")
const MovieModel = require("./models/movies")




app.get('/', function (req, res) {
  res.send({
    statu: "success",
  })
})

app.listen(3000)
module.exports = app
console.log("server started")

app.get("/insert",(req, res)=> {
      var moviemodel = new Moviemodel()
      moviemodel.name="rohit"
      moviemodel.cast = "ravi"

      moviemodel.save((err,data)=>{
        if(err){
          console.log(err)
        }else{
          res.status(200).send({"msg":"Inserted to DB"})
        }
      })
})