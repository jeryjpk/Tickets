const mongoose = require('mongoose');

const TicketPendingSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    empid:{
        type:String,
        required:true
    },
    priority:{
        type:Number,
        enum:[1,2,3]
    },
    status:{
        type:String,
        default:"Pending"
    },
    dateOfCreation:{
        type:Date,
        default:Date.now
    },
    supportPerson:{
        type:String,
        default:null
    },
    solution:{
        type:String,
        default:""
    }
  });

  module.exports.TicketPendingSchema = TicketPendingSchema