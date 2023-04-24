import {NFTStorage, File} from 'nft.storage';
import mime from 'mime';
import path from 'path';
import fs from 'fs';
// const fs = require('fs');

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0MDQ1ZkY4NjgyMDlBMmZhRWM5YUVhMjkxZjMxODIxMDY0ZmQzNzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTAzMTAxMjQ1OSwibmFtZSI6ImxlYXJuYmxvY2tjaGFpbiJ9.f3-CMXSMge6g8PhBT_t7EUG3aZ0xjxw4kl6sp3GJKog'

// const storeNFT = async (image, name, description) => {
//     try{
//         console.log(`Start to Store NFT...`)
//         const nftstorage = new NFTStorage({token : NFT_STORAGE_KEY})
//         const imageBlob = await (await fetch(image)).blob();
//         const nft = {
//             image: imageBlob,
//             name: name,
//             description: description,
//             properties: {
//                 organization: "tiblock",
//                 authors: [{name: "Tibloc"}],
//                 content:{"text/markdown":"test123"}
//             }
//         }
//         const metadata = await nftstorage.store(nft)
//         console.log(metadata)
//         console.log(`NFT Image Successfuly Stored...`)
//         console.log(`IPFS URL for the metadata: ${metadata.url}`)
//         console.log(`metadata.json contents:\n ${metadata.data}`)
//         console.log(`metadata.json with IPFS gateway URLs:\n ${metadata.embed}`)
//         return metadata;
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function fileFromPath(filePath){
//     const content = await fs.promises.readFile(filePath)
//     const type = mime.getType(filePath)
//     return new File([content], path.basename(filePath), {type})
// }

// // const updateNFT = async () => {
// //     const args = process.argv.slice(2)
// //     if(args.length !== 3){
// //         console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
// //         process.exit(1)
// //     }
// //     const [imagePath, name, description] = args
// //     const image = await fileFromPath(imagePath)
// //     const metadata = await storeNFT(image, name, description)
// //     return metadata
// // }

// async function main(){
//     const args = process.argv.slice(2)
//     if(args.length !== 3){
//         console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
//         process.exit(1)
//     }
//     const [imagePath, name, description] = args
//     const image = await fileFromPath(imagePath)
//     const metadata = await storeNFT(image, name, description)
//     return metadata
// }

async function storeAsset() {
    console.log('start')
    console.log(NFT_STORAGE_KEY)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })
    const imageNFT = new File(
        [await fs.promises.readFile('scripts/pug.png')],
        'pug.png',
        { type: 'image/png' }
    )
    console.log(imageNFT)
    const metadata = await client.store({
        name: 'ExampleNFTtestBlob',
        description: 'My ExampleNFT is an awesome artwork!',
        image: imageNFT,
    })
    console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
 }

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
// export {updateNFT, storeNFT}