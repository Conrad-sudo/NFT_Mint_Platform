
import React,{useState} from "react";
import MainMint from "./MainMint"
import NavBar from "./NavBar"



export default function Home() {
  //useState is a type of hook in react
  // It is used to render components that change example icon/background
  const [accounts,setAccounts]=useState([]);
  return (
  
  <div className='overlay'>
  <div className="Home">


   
    <NavBar accounts={accounts} setAccounts={setAccounts}/>
    <MainMint accounts={accounts}setAccounts={setAccounts} />

  </div>

  <div className='moving-background'></div>

  </div>
  
  );

}


