import React from "react";
import { Navigate } from "react-router-dom";
class AddContact extends React.Component{
    state = {
        name:"",
        email:"",
    }

    redirect = false;

    add = (e) => {
        e.preventDefault()
        if(this.state.name === "" || this.state.email === "")
        {
            alert("WTF are you doing")
        }
        else
        {
            this.props.addContactHandler(this.state)
            this.setState({
                name:"",
                email:"",
            })
            this.redirect=true
        }
    }
    render(){
        if(this.redirect){
        return(
            <Navigate to="/">
            </Navigate>
        )
      }
      else
      {
        return(
            
            <div className="ui main" style={{marginTop:"50px"}}>
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" placeholder="name"
                            value={this.state.name}
                            onChange={(e)=>{
                               this.setState({name:e.target.value})
                            }}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Email ID</label>
                        <input type="text" placeholder="name"
                            value={this.state.email}
                            onChange={(e)=>{
                                this.setState({email:e.target.value})
                            }}
                        ></input>
                    </div>
                    
                    <button className="ui button blue" 
                    disabled = {this.state.name==="" || this.state.email===""}
                    
                    >Add</button>
                </form>
            </div>
            
        );
                        }
    }
}

export default AddContact;