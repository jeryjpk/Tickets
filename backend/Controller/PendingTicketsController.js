const mongoose = require('mongoose');

const pendingTicketsSchema = require('../Schema/PendingTicketsSchema').TicketPendingSchema;

const Ticket = new mongoose.model('ticket', pendingTicketsSchema)

mongoose.set('useFindAndModify', false);


 const createTicket = (req, res) => {
    let newTicket = new Ticket(req.body);

    newTicket.save((err, Ticket )=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const getTickets = (req, res) => {
    
    Ticket.find({},(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const getTicketsById = (req, res) => {
    
    Ticket.findById(req.params.ticketId,(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const updatePendingTicketById = (req, res) => {
    Ticket.findByIdAndUpdate( req.params.ticketId, req.body , (err, ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(ticket);
    });
}; 

const deleteTicketById = (req, res) => {
    
    Ticket.findByIdAndDelete(req.params.ticketId, (err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        console.log("Ticket removed from TicketsInProgress Collection")
        res.json(Ticket);
    });
};
 
module.exports = {
    createTicket: createTicket,
    getTickets: getTickets,
    getTicketsById: getTicketsById,
    deleteTicketById: deleteTicketById,
    updatePendingTicketById:updatePendingTicketById
}