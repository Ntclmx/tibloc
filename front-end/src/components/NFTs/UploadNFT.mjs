import {NFTStorage, File} from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0MDQ1ZkY4NjgyMDlBMmZhRWM5YUVhMjkxZjMxODIxMDY0ZmQzNzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTAzMTAxMjQ1OSwibmFtZSI6ImxlYXJuYmxvY2tjaGFpbiJ9.f3-CMXSMge6g8PhBT_t7EUG3aZ0xjxw4kl6sp3GJKog'

module.exports = async function storeNFT(image, name, description){
    console.log(`Start to Store NFT...`)
    try{
        const nftstorage = new NFTStorage({token : NFT_STORAGE_KEY})
        const metadata = nftstorage.store({
            image,
            name, 
            description,
        })
        console.log(`NFT Image Successfuly Stored...`)
        console.log(`IPFS URL for the metadata: ${(await metadata).url}`)
        console.log(`metadata.json contents:\n ${(await metadata).data}`)
        console.log(`metadata.json with IPFS gateway URLs:\n ${(await metadata).embed}`)
        return metadata;
    } catch (error) {
        reportError(error)
    }
}

async function fileFromPath(filePath){
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), {type})
}

module.exports = async function updateNFT(){
    const args = process.argv.slice(2)
    if(args.length !== 3){
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
        process.exit(1)
    }
    const [imagePath, name, description] = args
    const image = await fileFromPath(imagePath)
    const metadata = await storeNFT(image, name, description)
    return metadata
}