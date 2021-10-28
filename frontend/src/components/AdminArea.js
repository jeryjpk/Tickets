import React, {useState, useEffect} from 'react'
import {AdminPendingComponent, AdminOngoingComponent, AdminClosedComponent} from './AdminPageComponents'
import './AdminArea.css'
import axios from 'axios';

function AdminArea({match}) {

    const [tab, setTab] = useState(1)
    const [ongoingTickets, setOngoingTickts] = useState([])
    const [pendingTickets, setPendingTickts] = useState([])
    const [closedTickets, setClosedTickts] = useState([])

    function openTab(evt, tabNo) {
        setTab(tabNo)
      }
      
    useEffect(()=>{
        getPendingTickets()
        getOngoingTickets()
        getClosedTickets()
    },[])


    function getPendingTickets(){
        axios.get("http://localhost:4000/ticketsPending")
            .then(res => {
                let array = res.data
                setPendingTickts(array)
            })           
    }

    function getOngoingTickets() {
        axios.get("http://localhost:4000/ticketsOngoing")
            .then(res => {
                let array = res.data
                setOngoingTickts(array)
            })
    }
    
    function getClosedTickets() {
        axios.get("http://localhost:4000/ticketsClosed")
            .then(res => {
                let array = res.data
                setClosedTickts(array)
            })
    }

    function decideClass(tabNo) {
        return tabNo === tab ? `tablinks active` : `tablinks`
    }
    
    return (
        <div className="adminArea">
            <div className="tab">
                <button className={decideClass(1)} onClick={event => openTab(event, 1)}>Ongoing</button>
                <button className={decideClass(2)} onClick={event => openTab(event, 2)}>Pending</button>
                <button className={decideClass(3)} onClick={event => openTab(event, 3)}>Closed</button>
            </div>

            {tab === 1 && <div id="ongoing" className="tabcontent">
                <h3 className="adminArea__heading">Ongoing Tickets</h3>
                <ul>{ongoingTickets.map(ticket => <AdminOngoingComponent key={ticket._id} description={ticket.description} category={ticket.category} status={ticket.status} 
                                priority={ticket.priority} supportPerson={ticket.supportPerson} date={ticket.dateOfCreation}/>)}</ul>  
            </div> }

            {tab === 2 && <div id="pending" className="tabcontent">
                <h3 className="adminArea__heading">Pending Tickets</h3>
                <ul>{pendingTickets.map(ticket => <AdminPendingComponent key={ticket._id} id={ticket._id} description={ticket.description} category={ticket.category} status={ticket.status} 
                                priority={ticket.priority} empid={ticket.empid} supportPerson={ticket.supportPerson} date={ticket.dateOfCreation}/>)}</ul>                
            </div> }

            {tab === 3 && <div id="closed" className="tabcontent">
                <h3 className="adminArea__heading">Closed Tickets</h3>
                <ul>{closedTickets.map(ticket => <AdminClosedComponent key={ticket._id} description={ticket.description} category={ticket.category} status={ticket.status} 
                                priority={ticket.priority} supportPerson={ticket.supportPerson} date={ticket.dateOfCreation}/>)}</ul>  
            </div> }
        </div>
    )
}

export default AdminArea


// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs