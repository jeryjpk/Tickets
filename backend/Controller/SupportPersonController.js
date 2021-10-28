const mongoose = require('mongoose');

const supportPersonSchema = require('../Schema/SupportPersonSchema').SupportPersonSchema;

const SupportPerson = new mongoose.model('SupportPersonList', supportPersonSchema)

mongoose.set('useFindAndModify', false);


 const createSupport = (req, res) => {
    let newSupport = new SupportPerson(req.body);

    newSupport.save((err, SupportPerson )=>{
        if(err)
        {
            res.send(err);
        }
        res.json(SupportPerson);
    });
};

const getSupport = (req, res) => {
    SupportPerson.find({},(err, SupportPerson)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(SupportPerson);
    });
};

module.exports={
    getSupport:getSupport,
    createSupport:createSupport
}