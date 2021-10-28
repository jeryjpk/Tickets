import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './SupportPage.css'

function SupportPage({match}) {
    const [pendingTicketsArray, setPendingTicketsArray] = useState([])
    const [acceptedTicketsArray, setAcceptedTicketsArray] = useState([])
    const [showPending, setShowPending] = useState(true)
    const [currentTicket, setCurentTicket]=useState('')
    const [currentSolution, setCurrentSolution]=useState('')
    const [editSol, setEditSol]=useState(false)

    useEffect( () => {
        getPendingTickets()
        getAcceptedTickets()
    }, [])

    const handleAccpetTicket = ticket => {
        axios.delete(`http://localhost:4000/ticketsPending/${ticket._id}`)
            .then(res => {
                let data = {
                    description: ticket.description,
                    priority: ticket.priority,
                    category: ticket.category,
                    empid: ticket.empid,
                    supportPerson: match.params.id,
                    status: "onGoing"
                }
                console.log(data)
                axios.post(`http://localhost:4000/ticketsOngoing`, data)
                    .then(res => {
                        getPendingTickets()
                        getAcceptedTickets()
                    })
            })
    }

    function getPendingTickets() {
        console.log("Rendering")
        axios.get("http://localhost:4000/ticketsPending")
            .then(res => {
                let array = res.data
                array = array.map(ticket => {
                    return (
                        <li key={ticket._id}>
                            <div className="supportPage__pendingTicketCard">
                                <div className="supportPage__cardLeft">
                                    <p>Category:{ ticket.category}</p>
                                    <p>Date:{ticket.dateOfCreation}</p>
                                    <p>Status: {ticket.status}</p>
                                    <p>Id: {ticket.empid}</p>
                                    <p>Description: {ticket.description}</p>
                                </div>
                                <div  className="supportPage__cardRight">
                                    <button onClick={e => handleAccpetTicket(ticket)}>Accept Ticket</button>
                                </div>
                            </div>
                        </li>
                    )
                })
                setPendingTicketsArray(array)
            })
    }

    function getAcceptedTickets() {
        console.log("Rendering")
        axios.get("http://localhost:4000/ticketsOngoing")
            .then(res => {
                let array = res.data
               array = array.filter(ticket => ticket.supportPerson === match.params.id)
                array = array.map(ticket => {
                    return (
                        <li key={ticket._id} className="supportPage__acceptedTicketCard">
                            <div onClick = {e => {setShowPending(false); setCurentTicket(ticket); setCurrentSolution(ticket.solution)}}>
                                    <p>Category:{ ticket.category}</p>
                                    <p>Date:{ticket.dateOfCreation}</p>
                                    <p>Status: {ticket.status}</p>
                                    <p>Id: {ticket.empid}</p>
                                    <p>Description: {ticket.description}</p>
                                    <p>Solution: {ticket.solution}</p>
                            </div>
                        </li>
                    )
                })
                setAcceptedTicketsArray(array)
            })
    }

    const handleUpdateSolution = () => {
        let data = {
            solution: currentSolution
        }
        axios.put(`http://localhost:4000/ticketsOngoing/${currentTicket._id}`, data)
            .then(res=> {
                getAcceptedTickets()
                setEditSol(false)
            })

    }
    const handleCloseTicket = ( )=> {
        axios.delete(`http://localhost:4000/ticketsOngoing/${currentTicket._id}`)
                    .then( res => {
                        let data = {
                            description: currentTicket.description,
                            priority: currentTicket.priority,
                            category: currentTicket.category,
                            empid: currentTicket.empid,
                            supportPerson: match.params.id,
                            status: "Closed"
                        }
                        getAcceptedTickets()
                        setShowPending(true)
                        axios.post(`http://localhost:4000/ticketsClosed`, data)
                    })
    }
        
    return (
        <div className="supportPage">
            <div className="supportPage__left">
                <h2>Tickets Accepted</h2>
                <ul className="supportPage__acceptedUl">{acceptedTicketsArray}</ul>
            </div>
            <div className="supportPage__right">
                {showPending && 
                    <div className="supportPage__PendingticketsView">
                        <h2>Pending Tickets</h2>
                        <ul className="supportPage__pendingUl">{pendingTicketsArray}</ul>
                    </div>}
                {!showPending && 
                    <div className="supportPage__CurrentTicketView">
                        <h2>Ticket Info</h2>
                        <div className="supportPage__currentTicket">
                            <button className="button" onClick={e => setShowPending(true)}>View Pending Ticket</button>
                            <p>Category: {currentTicket.category}</p>
                            <p>Status: {currentTicket.status}</p>
                            <p>Description: {currentTicket.description}</p>
                            <div>
                                <p>Solution: </p><textarea disabled={!editSol} value={currentSolution} onChange={e=>setCurrentSolution(e.target.value)}></textarea>
                                {!editSol && <button onClick={e => setEditSol(true)}>Edit</button> }
                                {editSol && <button onClick={e => {setEditSol(false); setCurrentSolution(currentTicket.solution)}}>Cancel</button> }
                                {editSol && <button onClick={e => handleUpdateSolution()}>Submit</button> }
                            </div>
                            <p>Priority: {currentTicket.priority}</p>
                            <p>Date of creation: {currentTicket.dateOfCreation}</p>
                            <button className="button" onClick={handleCloseTicket}>Close Ticket</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default SupportPage
