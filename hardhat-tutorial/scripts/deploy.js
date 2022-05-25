const { ethers } = require("hardhat");


async function main() {
    

const whitelistContract = await ethers.getContractFactory("Whitelist");


const deploywhitelistContract = await whitelistContract.deploy(10);



await deploywhitelistContract.deployed();


console.log("whitelist contract address", deploywhitelistContract.address);

}


main().then(() => process.exit(0)).catch((error) =>{console.error(error);
process.exit(1)});

