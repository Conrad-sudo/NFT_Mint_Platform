import React,{useState} from 'react'
import floatingSaturnNFT from "./floatingSaturnNFT.json"
const {ethers} = require("hardhat");
const contractAddress=process.env.CONTRACT_ADDRESS;


//declare the MainMint component
export default function MainMint({accounts}) {
    //an array that gets the mint amount and a function that sets the mint ammount
    //it is initiatedd with 1 .I dont know why 
    const [mintAmount,setMintAmount]=useState(1);

    const isConnected=Boolean(accounts[0])
   

      

    async function handleMint(){

        if(window.ethereum){
            //get a provider
        const provider=new ethers.providers.Web3Provider(window.ethereum)
         //get a signer to sign transactions ie A wallet
         const signer= provider.getSigner()
         const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);

         try{

            
            const amount= 0.05*mintAmount
            const _amount=ethers.utils.parseEther((amount).toString())

            const response =await nftContract.mint(ethers.BigNumber.from(mintAmount),{
                value: _amount
            })
            console.log("RESPONSE:\n", response)

        }catch(err){

            console.log("ERROR", err)

        }

        }

      
       

    }


    
   


    const handleDecrement=()=>{
        if(mintAmount<=1) return;
        setMintAmount(mintAmount-1)
    }

    const handleIncrement=()=>{
        if(mintAmount>=3) return;
        setMintAmount(mintAmount+1)
    }






  return (
    <div>

        <div className='content'>
        <h1>Floating Saturn</h1>
        <p> Welcome to the future of NFTs and collectable art.
             Step into a world of endless possibilities 
        </p>
        </div>

        {isConnected ?(

            <div>

            <div>
            <button className='btn' onClick={handleDecrement}>
                <span className='btn_icon'>

                <ion-icon name="remove-circle-sharp"></ion-icon>
                </span>
            </button>


            <input type="number" value={mintAmount}/> 


            <button className='btn' onClick={handleIncrement}>
            <span className='btn_icon'>
            <ion-icon name="add-circle-sharp"></ion-icon>
            </span>
            </button>

            </div>
            
            <button className='mintButton' onClick={handleMint}>Mint</button>


            </div>


        )    
        
        :  (
            <p>Connect Wallet</p>
        )

        
        
        }      
      
    </div>


  )
}
