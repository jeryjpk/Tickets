const createTicketModule = require('../Controller/PendingTicketsController')
const ongoingTicketsModule = require('../Controller/OngoingTicketsController')
const closedTicketsModule = require('../Controller/ClosedTicketsController')
const supportPersonModule=require('../Controller/SupportPersonController')

const createTicket=createTicketModule.createTicket;
const getTickets=createTicketModule.getTickets;
const getTicketsById=createTicketModule.getTicketsById;
const deleteTicketById=createTicketModule.deleteTicketById;
const updatePendingTicketById=createTicketModule.updatePendingTicketById;

const insertToOngoingTickets=ongoingTicketsModule.insertTicketToOngoingTickets;
const getOngoingTickets=ongoingTicketsModule.getOngoingTickets;
const getOngoingTicketsById=ongoingTicketsModule.getOngoingTicketsById;
const deleteOngoingTicketById=ongoingTicketsModule.deleteOngoingTicketById;
const updateOngoingTicketById=ongoingTicketsModule.updateOngoingTicketById;

const insertClosedTickets=closedTicketsModule.insertClosedTickets;
const getClosedTickets=closedTicketsModule.getClosedTickets;
const getClosedTicketsById=closedTicketsModule.getClosedTicketsById;
const deleteClosedTicketById=closedTicketsModule.deleteClosedTicketById;

const createSupport=supportPersonModule.createSupport;
const getSupport=supportPersonModule.getSupport;

const routes = app => {
    app.route('/ticketsPending')
        .get(getTickets)
        .post(createTicket);

    app.route('/ticketsPending/:ticketId')
        .get(getTicketsById)
        .delete(deleteTicketById)
        .put(updatePendingTicketById)

    app.route('/ticketsOngoing')
        .get(getOngoingTickets)
        .post(insertToOngoingTickets)

    app.route('/ticketsOngoing/:ticketId')
        .get(getOngoingTicketsById)  
        .delete(deleteOngoingTicketById)   
        .put(updateOngoingTicketById)   

    app.route('/ticketsClosed')
        .get(getClosedTickets)
        .post(insertClosedTickets)

    app.route('/ticketsClosed/:ticketId')
        .get(getClosedTicketsById)  
        .delete(deleteClosedTicketById)   

    // Support Collection
    app.route('/supportPerson')
        .get(getSupport)
        .post(createSupport)
}

module.exports=routes;