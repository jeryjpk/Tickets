const mongoose = require('mongoose');

const pendingTicketsSchema = require('../Schema/PendingTicketsSchema').TicketPendingSchema;

const ClosedTickets = new mongoose.model('ClosedTickets', pendingTicketsSchema)

mongoose.set('useFindAndModify', false);


const getClosedTickets = (req, res) => {
    
    ClosedTickets.find({},(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const insertClosedTickets = (req, res) => {
    let newTicket = new ClosedTickets(req.body);

    newTicket.save((err, Ticket )=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const getClosedTicketsById = (req, res) => {
    
    ClosedTickets.findById(req.params.ticketId,(err, Ticket)=>{
        if(err)
        {
            res.send(err);
        }
        res.json(Ticket);
    });
};

const deleteClosedTicketById = (req, res) => {
    
    ClosedTickets.findByIdAndDelete(req.params.ticketId, (err, ClosedTickets)=>{
        if(err)
        {
            res.send(err);
        }
        console.log("Ticket removed from TicketsClosedCollection")
        res.json(ClosedTickets);
    });
};
 


module.exports = { 
    insertClosedTickets: insertClosedTickets,
    getClosedTickets: getClosedTickets,
    getClosedTicketsById: getClosedTicketsById,
    deleteClosedTicketById: deleteClosedTicketById
}