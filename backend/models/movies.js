const mongoose = require("mongoose");
const Movie = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  Cast: {
    type: String,
    required: true,
  },

  //     language:{
  //         type:String,
  //         required:true
  //     },

  //    Genre:{
  //     type:String,
  //     required:true
  //    },

  //    location:{
  //        type:String,
  //        required:true
  //    },
  //    price:{
  //        type:Number,
  //        required:true
  //    },
});

module.exports = mongoose.model("Movie", Movie);
