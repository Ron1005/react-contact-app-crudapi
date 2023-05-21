import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useRef } from "react";

const ContactList = (props) =>{

    const inputEle = useRef("");
    const delContact = (id) =>{
        props.deleteContactHandler(id)
    }
    const renderContactList = props.contacts.map((contact)=>{
        return(
          <ContactCard contact={contact} delContact={delContact}/>
        );
    })

    const searchHandler = () =>{
        props.serachTermHandler(inputEle.current.value)
    }
    return(
       <div className="main" style={{marginTop:"50px"}}>
        <h2>
            Contact List
            <Link to="/add">
            <button className="ui button blue"
            style={{float:"right"}}>
            Add Button
           </button>
           </Link>
        </h2>
        <div className="ui search">
            <div className="ui icon input" style={{width:"1125px"}}>
            <input type="text" placeholder="search contacts" className="prompt"
                value={props.searchTerm}
                onChange={searchHandler}
                ref={inputEle}
            />
            <i className="search icon"></i>
            </div>
        </div>
       
        <div className="ui celled list">
            {renderContactList.length>0? renderContactList:"No Contacts Available"}
        </div>
        </div>
        
        
    );
}

export default ContactList;