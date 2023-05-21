import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactDetial = (props) =>{
    const location = useLocation()
   const {id,name,email} = location.state.contact
    return(
        <div className="main">
            <div className="ui card centerd" style={{marginTop:"100px",marginLeft:"400px"}}>
                <div className="content">
                    <div className="header">
                        {name}
                    </div>
                    <div className="description">
                        {email}
                    </div>
                    
                </div>
                <div className="center-div">
                    <Link to="/">
                   
                    <button className="ui button green centered" style={{marginLeft:"55px"}}>
                            Back to Contact List
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContactDetial;