
const {ethers} = require("hardhat");


const withdrawalAccount="0x2471bDC1284246288e94a1C710a9cFA3AB48f35F"

async function main() {
  

  //get the contract factory
  console.log("Deploying contract...")
  const FloatingSaturnNFT= await ethers.getContractFactory("FloatingSaturnNFT");
  const floatingSaturnNFT= await FloatingSaturnNFT.deploy(withdrawalAccount)

  await floatingSaturnNFT.deployed();

  console.log("FloatingSaturnNFT deployed to: ", floatingSaturnNFT.address)




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
