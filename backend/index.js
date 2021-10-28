// import express from "express";
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const routes=require('./routing/routes')
const app= express();

//Body Parser
app.use(bodyparser.urlencoded({extented: true}))
app.use(bodyparser.json())
app.use(cors())

const PORT=4000;

app.get('/', (req,res)=>res.send(`Hi from index running on ${PORT}`));

app.listen(PORT, () => {
    console.log("index is running!!!");
});

routes(app);

// DB connections
mongoose.connect("mongodb+srv://testUser:123321@cluster0.huuxx.mongodb.net/testTicket?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(!err)
    {
        console.log("DB connected succefully");
    }
    else{
        console.log(err);
    }
})