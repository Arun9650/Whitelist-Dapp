require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path:".env"});



const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const RINKEBY_PRIVATE_KEY  = process.env.RINKEBY_PRIVATE_KEY;


module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby: {
      url: ALCHEMY_API_KEY_URL,
        accounts: [RINKEBY_PRIVATE_KEY],

    }
  }
};


// contract address  0xFaE3F633AC9a016Ef0FeD28eb93EfD6CAFC964e3