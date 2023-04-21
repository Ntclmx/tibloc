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

exports.updateCategory = (req, res, next) => {

    const eventId = req.params.eventId;
    tickets = req.body.tickets;

    tickets.forEach(ticket => {
        const categoryName = ticket.categoryName;
        const categoryDescription = ticket.categoryDescription;
        const categoryPrice = ticket.categoryPrice;
        const categoryStock = ticket.categoryStock;

        if (ticket._id) {
            const categoryId = ticket._id;

            Category.findById(categoryId)
                .then(result => {
                    if (!result) {
                        const error = new Error('Category not found');
                        error.errorStatus = 404;
                        throw error;
                    }

                    result.eventId = eventId;
                    result.categoryName = categoryName;
                    result.categoryDescription = categoryDescription;
                    result.categoryPrice = categoryPrice;
                    result.categoryStock = categoryStock;
                    result.categoryId = categoryId;

                    return result.save();
                })
                .then(result => {

                    const response = {
                        message: 'Update Category Success',
                        event: result
                    };

                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log('err: ', err);
                })

        } else {

            const PostCategory = new Category({
                eventId: eventId,
                categoryName: categoryName,
                categoryDescription: categoryDescription,
                categoryPrice: categoryPrice,
                categoryStock: categoryStock,
            });

            PostCategory.save()
                .then(result => {
                    response = {
                        category: result
                    };

                    console.log(response);
                })
                .catch(err => {
                    console.log('err: ', err);
                })
        }
    });

}

exports.postNft = async (req, res, next) => {
    console.log(`Start Post NFT`)
    const categories = req.body.categories;
    let arrResult = [];
    let index = 0;
    
    for (const category of categories) {
        const categoryId = category.category._id;
        console.log(`Category = ${category.categoryName}`)
        for(const nft of req.body.nfts){
            console.log(`IPFS = ${nft[index].nftImage}`)
            const insertNFT = new Nft({
                categoryId: categoryId,
                nftImage: nft[index].nftImage,
                nftProbability: nft[index].nftProbability
            });

            await insertNFT.save()
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
        console.log(`==== Done ====`)        
        index = index + 1;
    }
    const finalResponse = {
        message: 'Create Categories Success',
        categories: arrResult
    };

    res.status(201).json(finalResponse);

}