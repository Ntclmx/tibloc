const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const mime = require('mime');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config()

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function fileFromPath(filePath){
  console.log(`Creating File from filePath ${filePath}`)
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), {type})
}

exports.storeNFT = async (imagePath, name, description, properties) => {
  console.log(`Start to Store NFT...`)
  // const [] = args;
  const client = new NFTStorage({ token: API_KEY });
  const image = await fileFromPath(imagePath);
  console.log(image)
  console.log(`Generating metadata...`)
  const metadata = await client.store({
    name: name,
    description: description,
    properties:{
        organizer: properties.organizer,
        authors: [{name: "Tibloc"}],
    },
    image: image,
  });
  console.log(metadata.ipnft)
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
  return metadata;
};

// storeAsset()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
