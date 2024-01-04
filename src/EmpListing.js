import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const EmpListing=()=>{

    const [empData, setEmpData] = useState(null);
    const navigate= useNavigate();

    const LoadDetail=(id)=>{
       navigate("/employee/detail/"+id); 
    }

    const RemoveFunction=(id)=>{
        fetch("http://localhost:8000/employee/"+id, {
            method: "DELETE"
        }).then((res)=>{
            alert("Deleted successfully");
            window.location.reload()
        }).catch((err)=>{
           console.log(err.message);
        })

    }

    const LoadEdit=(id)=>{
        navigate("/employee/edit/"+id)
    }

    useEffect(()=>{
     
        fetch("http://localhost:8000/employee").then(res=>res.json())
        .then(resp=>setEmpData(resp))
        .catch((err)=>console.log(err.message));
    },[])

    return(
    <div className="container">
         <div className="card">
            <div className="card-title">
                <h2>Employee Listing</h2>
            </div>
            <div className="card-body">
                <div>
                    <Link to="employee/create" className="btn btn-success mb-4">Add new (+)</Link>
                </div>
                <table className="table table-bordered">
                    <thead className="bg-black text-white">
                        <tr>
                            <td>id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empData && empData.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <a href="target_blank" onClick={()=>{LoadEdit(item.id)}} className="btn btn-success m-2">Edit</a>
                                        <a href="target_blank" onClick={()=>{RemoveFunction(item.id)}}className="btn btn-danger m-2">Remove</a>
                                        <a href="target_blank" onClick={()=>LoadDetail(item.id)} className="btn btn-primary m-2">Details</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
         </div>
    </div>    
    )
}