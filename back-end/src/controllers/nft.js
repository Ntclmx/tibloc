// const { validationResult } = require("express-validator");
// const path = require("path");
const Nft = require("../models/nft");
const {storeNFT} = require("../middleware/StoreNFT.js");
const Axios = require("axios");
// const { useEffect } = require('react');


exports.getAllNfts = (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 12;

  let totalItems;

  Nft.find()
    .countDocuments()
    .then((result) => {
      totalItems = result;

      return Nft.find()
        .skip((parseInt(currPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      const response = {
        message: "Get All nfts Success",
        nft: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currPage),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getNft = (req, res, next) => {
  const nftId = req.params.nftId;
  Nft.findById(nftId)
    .then((result) => {
      if (!result) {
        const error = new Error("Nft not found");
        error.errorStatus = 404;
        throw error;
      }
      const response = {
        message: "Get Nft Success",
        Nft: result,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getNftFromEvent = (req, res, next) => {
  const currPage = req.query.page || 1;
  const perPage = req.query.perPage || 50;
  const categoryId = req.params.categoryId;

  Nft.find({ categoryId: categoryId })
    .countDocuments()
    .then((result) => {
      if (result <= 0) {
        const error = new Error("Nft not found");
        error.errorStatus = 404;
        throw error;
      }

      totalItems = result;

      return Nft.find({ categoryId: categoryId })
        .skip((parseInt(currPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      const response = {
        message: "Get Nft Success",
        Nft: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currPage),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNft = async (req, res, next) => {
  console.log(`Start Post NFT`);
  const { categories, nft1, nft2, nft3, event } = req.body;
  const nfts = [nft1, nft2, nft3];
  let arrResult = [];
  let index = 0;

  console.log(nfts);
  // req.files
  for (const category of categories) {
    const cat = category.category;
    console.log(`Category = ${cat.categoryName}`);

    for (const file of req.files) {
      console.log(`loop index ${index}`);
      console.log(file);
      
      for (let i = 1; i <= 3; i++) {
        if (file.fieldname.includes(`nft${i}[${index}]`)) {
          console.log(`Store NFT ${file.fieldname}`)
          const nftImagePath = file.path;
          const nftProb = nfts[i-1][index].nftProbability;
          let nftImage = '';

          const properties = {
            organizer: 'testorg'
          }
          const metadata = await storeNFT(nftImagePath, `${cat.categoryName} #${index + 1}`, cat.categoryDescription, properties);
          
          // useEffect(() => {
            await Axios.get(`https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`)
              .then(result => {
                console.log(result.data.image);
                console.log((result.data.image).substring(7));
                nftImage = 'https://ipfs.io/ipfs/' + (result.data.image).substring(7);
                console.log(nftImage);
              })
              .catch(err => {
                console.log(err);
              })
          // }, []);

          const insertNFT = new Nft({
            categoryId: cat._id,
            nftImageURL: metadata.url,
            nftImageHttps: nftImage,
            nftProbability: nftProb,
          });

          await insertNFT
          .save()
          .then((result) => {
            response = {
              nft: result,
            };
            arrResult.push(response);
          })
          .catch((err) => {
            console.log("err: ", err);
          });
        }
      }
    }
    console.log(`==== Done ====`);
    index = index + 1;
  }
  const finalResponse = {
    message: "Store NFTs Success",
    nfts: arrResult,
  };

  res.status(201).json(finalResponse);
};
