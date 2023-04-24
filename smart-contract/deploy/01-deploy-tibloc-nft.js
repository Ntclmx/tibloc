const { Web3Provider } = require("@ethersproject/providers");
const {network} = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config");
const {verify} = require("../utils/verify");

module.exports = async function({getNamedAccounts, deployments}){
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log("=======================")
    const args = ["Tibloc NFT","TIB", 0, deployer]
    const tiblocNft = await deploy("TiblocNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("start verifying")
    log(network.name)
    log(process.env.ETHERSCAN_API_KEY)
    log(tiblocNft.address)
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        log("Verifying...")
        await verify(tiblocNft.address, args);
    }
    log("done verifying")

    log("===================================")
}