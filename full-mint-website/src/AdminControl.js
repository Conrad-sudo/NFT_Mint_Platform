import React,{useRef} from 'react'
import {ethers,BigNumber} from "ethers"
import floatingSaturnNFT from "./floatingSaturnNFT.json"
const contractAddress=process.env.CONTRACT_ADDRESS;



export default function AdminControl({accounts}) {

    
    const isConnected=Boolean(accounts[0])
    const connectedAccount=accounts[0];
    const provider=new ethers.providers.Web3Provider(window.ethereum)
        //get a signer to sign transactions ie A wallet
    const signer=provider.getSigner()
    let Supply=useRef()
    let Limit=useRef()
    let WalletAddress=useRef()
    let Uri= useRef()




    async function toggleMint(){


        
 
        const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);
        const gasPrice= await signer.getGasPrice()
        const gasLimit=200000

        try{
            const tx= await nftContract.toggleIsMintEnabled({
                from:connectedAccount,
                to:process.env.CONTRACT_ADDRESS,
                
                gasPrice:gasPrice,
                gasLimit:gasLimit
            })
            console.log("RESPONSE \n", tx)
        }catch(err){

            console.log("ERROR \n", err)
        }
        
    }


    async function changeWallet(){

        const walletAddress=WalletAddress.current.value

       
        const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);

        try{
            const tx= await nftContract.setWithdrawalWallet(walletAddress);
            console.log("RESPONSE \n", tx)


        }catch(err){

            console.log("ERROR \n", err)

        }


    }


    async function setMaxSupply(){

        const supply=Supply.current.value
       
        const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);

        try{
            const tx= await nftContract.setMaxSupply(BigNumber.from(supply));
            console.log("RESPONSE \n", tx)


        }catch(err){

            console.log("ERROR \n", err)

        }


    }

    async function setMintLimit(){

        const limit= Limit.current.value

       
        const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);

        try{
            const tx= await nftContract.setMaxSupply(BigNumber.from(limit));
            console.log("RESPONSE \n", tx)


        }catch(err){

            console.log("ERROR \n", err)

        }


    }


    async function setTokenUri(){

       
        const uri= Uri.current.value
        const nftContract=new ethers.Contract(contractAddress,floatingSaturnNFT.abi,signer);

        try{
            const tx= await nftContract.setBaseTokenUri(uri);
            console.log("RESPONSE \n", tx)


        }catch(err){

            console.log("ERROR \n", err)

        }


    }


   
















  return (
    <div>

        {isConnected?(

            <div>

            

            <div>
            <input type="number" ref={Supply} /> 
            <button className='adminButton' onClick={setMaxSupply}>Set Max Supply</button>
            </div>

            <div>
            <input type="number" ref={WalletAddress} /> 
            <button className='adminButton' onClick={changeWallet}>Change Wallet</button>
            </div>

            <div>
            <input type="number" ref={Limit} /> 
            <button className='adminButton' onClick={setMintLimit}>Set Mint Limit</button>
            </div>

            <div>
            <input type="number" ref={Uri} /> 
            <button className='adminButton' onClick={setTokenUri}>Set Base Uri</button>
            </div>

            <div>
            <button className='adminButton' onClick={toggleMint}>Allow Minting</button>
            </div>

            


            </div>

        ):(<h2>Only Citidal Members Can Enter</h2>) }
        
      
    </div>
  )
}
