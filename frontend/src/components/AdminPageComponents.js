import React, {useState, useEffect} from 'react'
import './AdminPageComponents.css'
import axios from 'axios'

export function AdminPendingComponent({description, category, status, priority, date, empid, supportPerson, id}) {
    const [selectSupport, setSelectSupport] = useState('')
    const [supportPersonArray, setSupportPersonArray] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/SupportPerson")
            .then(res => {
                setSupportPersonArray(res.data)
            })
    }, [])

    const handleAccpetTicket = () => {
        axios.delete(`http://localhost:4000/ticketsPending/${id}`)
            .then(res => {
                let data = {
                    description: description,
                    priority: priority,
                    category: category,
                    empid: empid,
                    supportPerson: selectSupport,
                    status: "onGoing"
                }
                console.log(data)
                axios.post(`http://localhost:4000/ticketsOngoing`, data)
                    .then(res => {
                        console.log("Support Assigned Successfully")
                        window.location.reload(false)
                    })
            })
    }

    const handleAssignSupport = () => {
        if(selectSupport !== '') {
            handleAccpetTicket()
        } 
    }

    return (
        <li className="adminArea__tiketList">
            {console.log("Support person assigned is", selectSupport)}
            <div>
                <p>Category:{category}</p>setSelectSupport
                <p>Date:{date}</p>
                <p>Status: {status}</p>
                <p>Priority: {priority}</p>
                <p>Description: {description}</p>
            </div>
            <div>
                <select id="selectSupport" onChange={e => setSelectSupport(e.target.value)} value={selectSupport}>
                    <option>Select support person</option>
                    {supportPersonArray.map(supportPerson => <option value={supportPerson.empid}>{supportPerson.empid}</option>)}
                </select>
                <button onClick={handleAssignSupport}>Submit</button>
            </div>
            
        </li>        
    )
}


export function AdminOngoingComponent({description, category, status, priority, date, supportPerson}) {
    return (
        <li className="adminArea__tiketList">
            <p>Category:{category}</p>
            <p>Date:{date}</p>
            <p>Status: {status}</p>
            <p>Priority: {priority}</p>
            <p>Description: {description}</p>
        </li>        
    )
}


export function AdminClosedComponent({description, category, status, priority, date, supportPerson}) {
    return (
        <li className="adminArea__tiketList">
            <p>Category:{category}</p>
            <p>Date:{date}</p>
            <p>Status: {status}</p>
            <p>Priority: {priority}</p>
            <p>Description: {description}</p>
        </li>        
    )
}

