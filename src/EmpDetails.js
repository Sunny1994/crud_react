import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EmptDetails=()=>{

    const {empid}= useParams();
    const [empData, setEmpData]= useState({});

    useEffect(()=>{

        fetch("http://localhost:8000/employee/"+empid).then(res=>res.json())
        .then(resp=>setEmpData(resp))
        .catch((err)=>console.log(err.message));
    },[])

    return(
        <div>
            <div className="card">
            <div className="card-title">
                <h2>Employee Create</h2>
            </div>
            <div className="card-body"></div>
            {
                empData &&  
                <div>
                  <h1>The employee name is {empData.name} ({empData.id})</h1>
                  <h3>Contact details</h3>
                  <h5>Email is {empData.email}</h5>
                  <h5>Phone is {empData.phone}</h5>
                  <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
               
            }
            </div>

        </div>
    )
}

export default EmptDetails;