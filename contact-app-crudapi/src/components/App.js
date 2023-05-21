import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { useState,useEffect} from 'react';
import api from '../api/contact'
import {v4 as uuidv4} from "uuid";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ContactDetial from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const [contacts,setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([])

  const retriveContacts = async() =>{
    const retriveContact = await api.get("/contacts")
    return retriveContact.data;
  };

  const addContactHandler = (childvalue) =>{
    console.log(childvalue)
    const response = {
      id : uuidv4(),
      ...childvalue
    }
    api.post("/contacts",response)
    setContacts([...contacts,response])
  }

  const removeContactHandler = (id) =>{
    api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id
    });
    setContacts(newContactList)
  }

  const updateContactHandler = (response) =>{
    api.put(`/contacts/${response.id}`,response)
    const updatedContactList = contacts.map((contact)=>{
      return contact.id === response.id ? response : contact
    })
    setContacts(updatedContactList)
  } 

  const serachTermHandler = (serachTermValue) =>{
    setSearchTerm(serachTermValue)
    if(serachTermValue!=="")
    {
      const searchFilterContacts = contacts.filter((contact)=>{
       return Object.values(contact).join("").toLowerCase().includes(serachTermValue.toLowerCase())
      })
      setSearchResults(searchFilterContacts)
    }
    else
    {
      setSearchResults(contacts)
    }
  }

  useEffect(()=>{
    // if(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))&& JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).length>0)
    // {
    // setContacts(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
    // }
    const getcontacts = async() => {
      const allContacts = await retriveContacts()
      if(allContacts)
      {
        setContacts(allContacts)
      }
    }
    getcontacts()
  },[]);

  useEffect(()=>{
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts])

  return (
  <div className='ui container'>
    <Router>
    <Header></Header>
    <Routes>
      <Route path="/"  
       element={<ContactList contacts={searchTerm.length<1 ? contacts : searchResults} deleteContactHandler = {removeContactHandler}
       searchTerm={searchTerm}
       serachTermHandler= {serachTermHandler}
       />}
      />
      <Route path="/add"  
      element={<AddContact addContactHandler={addContactHandler}/>}
      />
      <Route path="/contact/:id" element={<ContactDetial/>}></Route>
      
      <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler}/>}>
        
      </Route>
   {/* <AddContact addContactHandler={addContactHandler}/>
    <ContactList contacts={contacts} deleteContactHandler = {removeContactHandler}/> */}
    </Routes>
    </Router>
 
  </div>
  );
}

export default App;
