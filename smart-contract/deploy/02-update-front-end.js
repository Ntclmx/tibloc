const {
    frontEndContractsFile,
    frontEndAbiLocation,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    console.log(`Start Update Abi`)
    const tiblocNft = await ethers.getContract("TiblocNFT")
    fs.writeFileSync(
        `${frontEndAbiLocation}TiblocNFT.json`,
        tiblocNft.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    console.log(`Start Update Contract Address`)
    const chainId = network.config.chainId.toString()
    const tiblocNFT = await ethers.getContract("TiblocNFT")
    const readFile = fs.readFileSync(frontEndContractsFile, "utf8")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["TiblocNFT"].includes(tiblocNFT.address)) {
            contractAddresses[chainId]["TiblocNFT"] = tiblocNFT.address
        }
    } else {
        contractAddresses[chainId] = { TiblocNFT : [tiblocNFT.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]