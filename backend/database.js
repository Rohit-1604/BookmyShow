const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const movies = require('./models/movies');
const uri =process.env.DB_CONNECTION;
//Database
console.log(uri);
app.use(express.json());
app.use(express.urlencoded({
   extended: false
}))

app.use("/movies",movies)


const database = (module.exports =()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,

}
   try{
        mongoose.connect(uri),
     console.log('Database connected successfully')
    }catch(error){
      console.log("database connection failed")
      
   }
});
database();

app.listen(3000, ()=>{
   console.log("server listening on port 3000")

});