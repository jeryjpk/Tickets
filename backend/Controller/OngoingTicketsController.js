const mongoose = require('mongoose');

const pendingTicketsSchema = require('../Schema/PendingTicketsSchema').TicketPendingSchema;

const OngoingTickets = new mongoose.model('OngoingTickets', pendingTicketsSchema)

mongoose.set('useFindAndModify', false);

const getOngoingTickets = (req, res) => {
    OngoingTickets.find({},(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const insertTicketToOngoingTickets = (req, res) => {
    let newTicket = new OngoingTickets(req.body);

    newTicket.save((err, Ticket )=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const getOngoingTicketsById = (req, res) => {
    OngoingTickets.findById(req.params.ticketId,(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const updateOngoingTicketById = (req, res) => {
    OngoingTickets.findByIdAndUpdate( req.params.ticketId, req.body , (err, ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(ticket);
    });
}; 

const deleteOngoingTicketById = (req, res) => {
    
    OngoingTickets.findByIdAndDelete(req.params.ticketId, (err, OngoingTickets)=>{
        if(err)
        {
            res.send(err);
        }
        console.log("Ticket removed from TicketsOngoing Collection")
        res.json(OngoingTickets);
    });
};

module.exports = { 
    insertTicketToOngoingTickets: insertTicketToOngoingTickets,
    getOngoingTickets: getOngoingTickets,
    getOngoingTicketsById: getOngoingTicketsById,
    deleteOngoingTicketById: deleteOngoingTicketById,
    updateOngoingTicketById:updateOngoingTicketById
}