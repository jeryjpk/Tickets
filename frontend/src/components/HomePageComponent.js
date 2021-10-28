import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import './HomePageComponent.css'
import axios from 'axios';

function HomePageComponent() {
    const [empId, setEmpId]= useState('')
    const [userType, setUserType] = useState('')
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault()
        
        if(userType==="support"){
            axios.get("http://localhost:4000/supportPerson")
            .then(res => {
                let array = res.data
                let alreadyExists = false
                
                array.map(supportPersonObject => {
                    if(supportPersonObject.empid === empId) {alreadyExists = true}
                })
                if(!alreadyExists) {
                    let data = {
                        empid: empId
                    }
                    axios.post("http://localhost:4000/supportPerson", data)
                        .then(console.log("Support person id added successfully"))
                }
            })
        }
        history.push(`${userType}/${empId}`);
    }

    return (
        <div className="homePage">
            <form className="homePage__infoForm" onSubmit= {e => handleSubmit(e)}>
                <div>
                    <label for="empId">Employee Id</label>
                    <input className="inputPrimary" id="empId" onChange={e => setEmpId(e.target.value)} value={empId}></input>
                </div>
                <div>
                    <label for="userType">Select User Type</label>
                    <select id="userType" onChange={e => setUserType(e.target.value)} value={userType}>
                        <option value="">Select user type</option>
                        <option value="admin">Admin</option>
                        <option value="support">Support</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default HomePageComponent
