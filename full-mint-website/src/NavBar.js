import React from "react"
//import {Box,Button,Flex,Image,Link,Spacer} from "@chakra-ui/react"

import FB from "./assets/social-media-icons/facebook.png"
import TWT from "./assets/social-media-icons/twitter.png"
import EML from "./assets/social-media-icons/email.png"


//Navbar component
export default function NavBar({accounts,setAccounts}) {

    //Check to see whether the first account exists or not
    const isConnected=Boolean(accounts[0]);
    const currentAccount=accounts[0]

    async function connectAccount(e){
        //Check to see if the window.ethereum object has been injected into the DOM showing Metamask is present

        if(window.ethereum){

            //get the all accounts from the metamask wallet
            const walletAccounts= await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            setAccounts(walletAccounts)
        }

    }






  return (
    <div>
        {/*Left side-Social media*/}
        <div className="links"> 
            <a href="http://facebook.com" >
                
                <img src={FB}/ >  
            
             </a>

             <a href="http://twitter.com" >
                
                <img src={TWT}/ >  
            
             </a>

             <a href="http://discord.com" >
                
                <img src={EML}/ >  
            
             </a>
        </div>
        

        {/**Right side- Sections and connect */}

        <div className="about">

            <a href="">About</a>
            <a href="">Mint</a>
            <a href="">Team</a>

        

        </div>
        

        {/**Connect button */}
        {isConnected?(
            
            <h2>Wallet Connected : {currentAccount}</h2>
        ):(<button onClick={connectAccount} className="connectButton">Connect</button>)}


      
    </div>
  )
}
