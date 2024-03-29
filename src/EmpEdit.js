import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const EmpEdit=()=>{

    const {empid}= useParams();

    const[id, setId]= useState("");
    const[name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isActive, setIsActive] = useState(true);

    const navigate=useNavigate();

    useEffect(()=>{

        fetch("http://localhost:8000/employee/"+empid).then(res=>res.json())
        .then(resp=>{setId(resp.id);
                    setName(resp.name);
                    setEmail(resp.email);
                    setPhone(resp.phone);
                    setEmail(resp.email);})
        .catch((err)=>console.log(err.message));
    },[])

   
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const empData= {name, email, phone, isActive};
        fetch("http://localhost:8000/employee/"+empid, {
            method: "PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(empData)
        }).then((res)=>{
            alert("Saved successfully");
            navigate("/");
        }).catch((err)=>{
           console.log(err.message);
        })
    }

    return(
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{"textAlign": "left"}}>
                            <div className="card-title">
                               <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onChange={e=>setName(e.target.value)}className="form-control"></input>
                                            {name.length===0 && <span className="text-danger">Enter something man</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={e=>setPhone(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">                                   
                                        <label className="form-check-label">Is Active</label>
                                        <input type="checkbox" checked={isActive} onChange={e=>setIsActive(e.target.checked)} className="form-check-input"></input>   
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">                                   
                                          <button className="btn btn-success m-1" type="submit">Save</button>
                                          <Link to="/" className="btn btn-danger">Back</Link> 
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default EmpEdit;