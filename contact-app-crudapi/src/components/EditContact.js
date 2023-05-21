import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const EditContact = (props) =>{
    const location = useLocation();
    const navigate = useNavigate();
    // const newname = location.state.contact.name
    // const newemail = location.state.contact.email
    const [newname,setNewName] = useState(location.state.contact.name)
    const [newemail,setNewEmail] = useState(location.state.contact.email)
    const newid = location.state.contact.id

    const update = (e) =>{
        e.preventDefault();
       const response = {
            id:newid,
            name:newname,
            email:newemail
        }
        props.updateContactHandler(response)
        navigate("/")

    }

    return(
        <div className="ui main" style={{marginTop:"50px"}} onSubmit={update}>
        <h2>Edit Contact</h2>
        <form className="ui form">
            <div className="field">
                <label>Name</label>
                <input type="text" placeholder="name"
                    value={newname}
                    onChange={(e)=>{
                        setNewName(e.target.value)
                    }}
                ></input>
            </div>
            <div className="field">
                <label>Email ID</label>
                <input type="text" placeholder="name"
                    value={newemail}
                    onChange={(e)=>{
                        setNewEmail(e.target.value)
                    }}
                ></input>
            </div>
            
            <button className="ui button blue" 
            disabled = {newname==="" || newemail===""}
            
            >Update</button>
        </form>
    </div>
    );
}

export default EditContact
