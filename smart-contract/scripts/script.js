const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/TiblocNFT.sol/TiblocNFT.json");
const abi = ContractJson.abi;

async function main() {

    // // make an API call to the ABIs endpoint 
    // const response = await fetch('https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x5FbDB2315678afecb367f032d93F642f64180aa3&apikey=5UBK3J6WT9WCJ2NZCYHZ53GB69P81TA3V8');
    // const data = await response.json();

    // // print the JSON response 
    // let abi = data.result;
    // console.log(abi);

    console.log("test run script")
    const alchemy = new hre.ethers.providers.AlchemyProvider('maticmum', process.env.MUMBAI_API_KEY);
    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    //get the deployed contract
    const TiblocNFT = new hre.ethers.Contract(process.env.CONTRACT_ADDRESS, abi, userWallet);
    
    
    await TiblocNFT.payToMint("test mumbai2","test mumbai2","https://bafkreicz5vqq5kqpfo75fvvgfafd3nmrxvvzbxeg7ic53n7v4xbnl3kmt4.ipfs.nftstorage.link/",100000,"asdasfafafa",12345678900000);
    console.log("done pay to mint");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });