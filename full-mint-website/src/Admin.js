
import React,{useState} from 'react'
import NavBar from "./NavBar"
import AdminControl from './AdminControl';

export default function Admin() {
   //useState is a type of hook in react
  // It is used to render components that change example icon/background
  const [accounts,setAccounts]=useState([]);
  return (
  
  <div className='overlay'>
  <div className="Home">


   
    <NavBar accounts={accounts} setAccounts={setAccounts}/>
    <AdminControl accounts={accounts} />
    

  </div>

  <div className='admin-background'></div>

  </div>
  
  );
}
