import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './UserPage.css'
import MyStatefulEditor from './RichTextEditors'
import 'bootstrap/dist/css/bootstrap.min.css';

let array = []
function UserPage({match}) {
    const [description, setdesc]= useState('')
    const [priority, setpriority] = useState('')
    const [category, setcategory]=useState('')
    const [ticketsOngoing, setTicketsOngoing]=useState([])
    const [ticketsPending, setTicketsPending]=useState([])
    const [ticketsClosed, setTicketsClosed]=useState([])
    const [isInfoPage, setIsInfoPage]=useState(false)
    const [editDesc, setEditDesc]=useState(false)
    const [editPriority, setEditPriority]=useState(false)
    const [currentTicket, setCurentTicket]=useState('')
    const [currentDescription, setCurrentDescription]=useState('')
    const [isShowOngoing, setIsShowOngoing] = useState(1) // 1 -> Ongoing 2-> Pending 3-> Closed

    const handleSubmit = e => {
        e.preventDefault()
        let data = {
            description: description,
            priority: priority,
            category: category,
            empid: match.params.id
        }
        axios.post("http://localhost:4000/ticketsPending", data)
            .then(res => getTickets())
    }

    useEffect( () => {
        getTickets()
    }, [])

    const renderTicketInfo = (ticket) => {
        setCurrentDescription(ticket.description)
        setIsInfoPage(true)
        setCurentTicket(ticket)
    }

    function getTickets() {
        console.log("Rendering")
        let finalArray = []
        let array = []
        axios.get("http://localhost:4000/ticketsPending")
            .then(res => {
                array = res.data
                array = array.filter(ticket => ticket.empid === match.params.id)
                array = array.map(ticket => {
                    return (
                        <li key={ticket._id}>
                            <div onClick={e => renderTicketInfo(ticket)} className="ticketCard">
                                <p>Category:{ ticket.category}</p>
                                <p>Date:{ticket.dateOfCreation}</p>
                                <p>Status: {ticket.status}</p>
                                <p>Id: {ticket.empid}</p>
                                <p>Description: {ticket.description}</p>
                            </div>
                        </li>
                    )
                })
                setTicketsPending(array)
                axios.get("http://localhost:4000/ticketsOngoing")
                .then(res => {
                    array = res.data
                    array = array.filter(ticket => ticket.empid === match.params.id)
                    array = array.map(ticket => {
                        return (
                            <li key={ticket._id}>
                                <div onClick={e => renderTicketInfo(ticket)} className="ticketCard">
                                    <p>Category:{ ticket.category}</p>
                                    <p>Date:{ticket.dateOfCreation}</p>
                                    <p>Status: {ticket.status}</p>
                                    <p>Id: {ticket.empid}</p>
                                    <p>Description: {ticket.description}</p>
                                </div>
                            </li>
                        )
                    })
                    setTicketsOngoing(array)
                    // finalArray = finalArray.concat(array)
                    axios.get("http://localhost:4000/ticketsClosed")
                    .then(res => {
                        array = res.data
                        array = array.filter(ticket => ticket.empid === match.params.id)
                        array = array.map(ticket => {
                            return (
                                <li key={ticket._id}>
                                    <div onClick={e => renderTicketInfo(ticket)} className="ticketCard">
                                        <p>Category:{ ticket.category}</p>
                                        <p>Date:{ticket.dateOfCreation}</p>
                                        <p>Status: {ticket.status}</p>
                                        <p>Id: {ticket.empid}</p>
                                        <p>Description: {ticket.description}</p>
                                    </div>
                                </li>
                            )
                        })
                       // console.log("Array", finalArray.concat(array))
                    //    setTicketsReceived(finalArray.concat(array))
                    setTicketsClosed(array)
                    })
                })
            })
    }

    // bro will be back someone ringing the bell!
    

    const  editDataDescsetDesc = () => {
        setEditDesc(true)
    }

    const  editDataPriority = () => {
        setEditPriority(true)
    }

    // const renderSideBarTickets = () => {
    //     let arr = ticketsReceived.filter(ticket => {
    //         if(isShowOngoing === 1) return ticket.status === "onGoing"
    //         if(isShowOngoing === 2) return ticket.status === "Pending"
    //         if(isShowOngoing === 3) return ticket.status === "closed"
    //     })
    //     return arr
    // }

    return (
        <div className="userPage">
        <div  className="userPage__left">
            <h2>Tickets History</h2>
            <div className="userPage__leftButtons">
                <button className="userPage__leftbutton" onClick={e => setIsShowOngoing(1)}>Ongoing</button>
                <button className="userPage__leftbutton" onClick={e => setIsShowOngoing(2)}>Pending</button>
                <button className="userPage__leftbutton" onClick={e => setIsShowOngoing(3)}>Closed</button>
            </div>
            {isShowOngoing===1 && <ul>{ticketsOngoing}</ul>}
            {isShowOngoing===2 && <ul>{ticketsPending}</ul>}
            {isShowOngoing===3 && <ul>{ticketsClosed}</ul>}
        </div>
            <div className="userPage__right">
                {!isInfoPage && 
                <div className="formdata">
                    <form className="ticketForm" onSubmit= {e => handleSubmit(e)}>
                        <div>
                            <label for="category">Category</label>
                            <select id="category" onChange={e => setcategory(e.target.value)} value={category}>
                                <option value="">Select Category</option>
                                <option value="software">Software</option>
                                <option value="hardware">Hardware</option>
                                <option value="sbws">SBWS</option>
                                <option value="networking">Networking</option>
                            </select>
                        </div>
                        <div>
                            <p>Priority</p>
                            <label>Low<input type="radio" checked={priority==="1"} onChange={e=>setpriority("1")} value="1"></input></label>
                            <label>Medium<input type="radio" checked={priority==="2"} onChange={e=>setpriority("2")} value="2"></input></label>
                            <label>High<input type="radio" checked={priority==="3"} onChange={e=>setpriority("3")} value="3"></input></label>
                        </div>        
                        <div>
                            <label for="description">Description</label>
                            <MyStatefulEditor/>
                            {/* <input className="userPage__descInput"  type="textarea" size="200" onChange={e=>setdesc(e.target.value)}value={description}></input>
                        */}</div>
                        <button className="button">Submit</button>
                    </form>
                </div>}
                    
                {isInfoPage && (
                    <div className="ticketHistoryData">
                        <button className="button" onClick={e => setIsInfoPage(false)}>New Ticket</button>
                        <p>Category: {currentTicket.category}</p>
                        <p>Status: {currentTicket.status}</p>
                        <div>
                            <p>Description: </p><textarea disabled={!editDesc} value={currentDescription} onChange={e=>setCurrentDescription(e.target.value)}></textarea>
                            {!editDesc && <button onClick={e => setEditDesc(true)}>Edit</button> }
                            {editDesc && <button onClick={e => setEditDesc(false)}>Cancel</button> }
                        </div>

                        <div>
                            <p>Priority: {currentTicket.priority}</p>
                            <button onClick={e => editDataPriority()}>Edit</button>
                        </div>
                        <p>Support Person :{currentTicket.supportPerson}</p>
                        <p>Solution Provided:{currentTicket.solution} </p>
                        <p>Date of creation: {currentTicket.dateOfCreation}</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default UserPage
