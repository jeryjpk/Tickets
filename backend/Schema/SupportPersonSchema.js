const mongoose = require('mongoose');

const SupportPersonSchema = new mongoose.Schema({
    empid:{
        type:String,
        required:true
    }
  });

  module.exports.SupportPersonSchema = SupportPersonSchema