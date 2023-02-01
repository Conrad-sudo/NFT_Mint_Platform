//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract FloatingSaturnNFT is ERC721,Ownable{

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public mintLimit;
    bool public isMintEnabled;
    string internal baseTokenUri;
    address payable private withdrawalWallet;
    mapping(address=>uint256) public mintedWallets;


    constructor(address payable withdrawalWallet_) payable ERC721("Floating Saturn","FTSN"){

        mintLimit=3;
        mintPrice=0.05 ether;
        maxSupply=500;
        withdrawalWallet=withdrawalWallet_;
        

    }

    //changes the maxSupply
    function setMaxSupply(uint256 supply) external onlyOwner{

        require(supply>totalSupply,"Cannot decrease total supply ");
        maxSupply=supply;
    }

    //changes the mint limit
    function setMintLimit(uint256 limit) external onlyOwner{
        require(limit> mintLimit," Cannot decrease mint limit");
        mintLimit=limit;
    }
    //sets the uri for the tokens
    function setBaseTokenUri(string calldata uri) external onlyOwner{
        baseTokenUri=uri;
    }

    //chnages the withdrawal wallet address
    function setWithdrawalWallet(address payable newAddress ) external onlyOwner returns(bool success){
        withdrawalWallet=newAddress;
        return true;
    }

    

    //function that opensea calls to grab the link for images
    function tokenURI(uint256 tokenId) public view override returns(string memory){

            _requireMinted(tokenId);
          
            //If a base uri exists then send the string of the combination of the token URI and the tokenId.
            //If not, return an empyt string
            return bytes(baseTokenUri).length>0 ? string(abi.encodePacked(baseTokenUri,Strings.toString(tokenId),".json")):"";

    }


    //allows the owner to enable or disable minting
    function toggleIsMintEnabled() external onlyOwner {
        isMintEnabled=!isMintEnabled;
    }





    function mint(uint256 quantity) payable external {
        //each wallet can only up to the mintLimit
        require(mintedWallets[msg.sender]+quantity<mintLimit," Cannot exceed minting limit");
        //Make sure the max supply hasnt been reached
        require(totalSupply+quantity<maxSupply,"Sold out");
        //check whether minting is enabled
        require(isMintEnabled,"Minting isnt allowed");
        //Check that the sender sent the right amount
        require(msg.value==mintPrice*quantity,"enter the right amount ");


        mintedWallets[msg.sender]+=quantity;
        totalSupply+=quantity;

        for (uint256 tokenId=1;tokenId<=totalSupply;tokenId++){

            if(!_exists(tokenId)){
                 _safeMint(msg.sender,tokenId);
            }
        }

        /*
        for (uint256 i=0;i<quantity;i++){

            uint256 newTokenId=totalSupply+1;
            totalSupply++;
            mintedWallets[msg.sender]++;
            _safeMint(msg.sender,newTokenId);

        }*/

        
       


    }


    function withdraw() external onlyOwner{

        //withdrawalWallet.transfer(address(this).balance);
        (bool success,)=withdrawalWallet.call{value:address(this).balance}("");
        require(success," Withdrawal Failed");
    }










}



