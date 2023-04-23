const { validationResult } = require('express-validator');
const path = require('path');
const Nft = require('../models/nft');

exports.getAllNfts = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 12;

    let totalItems;

    Nft.find()
        .countDocuments()
        .then(result => {
            totalItems = result;

            return Nft.find()
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {
            const response = {
                message: 'Get All nfts Success',
                nft: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currPage)
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        });

}

exports.getNft = (req, res, next) => {
    const nftId = req.params.nftId;
    Nft.findById(nftId)
        .then(result => {
            if (!result) {
                const error = new Error('Nft not found');
                error.errorStatus = 404;
                throw error;
            }
            const response = {
                message: 'Get Nft Success',
                Nft: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.getNftFromEvent = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 50;
    const categoryId = req.params.categoryId;

    Nft.find({ categoryId: categoryId })
        .countDocuments()
        .then(result => {
            if (result <= 0) {
                const error = new Error('Nft not found');
                error.errorStatus = 404;
                throw error;
            }

            totalItems = result;

            return Nft.find({ categoryId: categoryId })
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {

            const response = {
                message: 'Get Nft Success',
                Nft: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currPage)
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.postNft = async (req, res, next) => {

    const categories = req.body.categories;
    let arrResult = [];
    let index = 0;
    // console.log('test', req.body.categories, req.files)
    for (const category of categories) {

        const categoryId = category.category._id;

        let arrNft = [];

        let nft1 = '';
        let nft2 = '';
        let nft3 = '';
        console.log(req.files);
        for (const file of req.files) {
            if (file.fieldname === `nft1[${index}][nftImage]`) {
                nft1 = file.path;
            }
            else if (file.fieldname === `nft2[${index}][nftImage]`) {
                nft2 = file.path;
            }
            else if (file.fieldname === `nft3[${index}][nftImage]`) {
                nft3 = file.path;
            }
        }

        const nft1prob = req.body.nft1[index].nftProbability
        const nft2prob = req.body.nft2[index].nftProbability
        const nft3prob = req.body.nft3[index].nftProbability


        if (nft1 !== '' && nft1prob !== null) {
            const Nft1 = new Nft({
                categoryId: categoryId,
                nftImage: nft1,
                nftProbability: nft1prob
            });
            await Nft1.save()
                .then(result => {
                    response = {
                        nft: result
                    };

                    arrResult.push(response);


                })
                .catch(err => {
                    console.log('err: ', err);
                })

        }

        if (nft2 !== '' && nft2prob !== null) {
            const Nft2 = new Nft({
                categoryId: categoryId,
                nftImage: nft2,
                nftProbability: nft2prob
            });
            await Nft2.save()
                .then(result => {
                    response = {
                        nft: result
                    };

                    arrResult.push(response);


                })
                .catch(err => {
                    console.log('err: ', err);
                })
        }


        if (nft3 !== '' && nft3prob !== null) {

            const Nft3 = new Nft({
                categoryId: categoryId,
                nftImage: nft3,
                nftProbability: nft3prob
            });
            
            await Nft3.save()
                .then(result => {
                    response = {
                        nft: result
                    };
    
                    arrResult.push(response);
    
    
                })
                .catch(err => {
                    console.log('err: ', err);
                })
        }

        index = index + 1;
    }
    const finalResponse = {
        message: 'Create Categories Success',
        categories: arrResult
    };

    res.status(201).json(finalResponse);

}