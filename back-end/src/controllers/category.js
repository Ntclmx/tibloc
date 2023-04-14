const { validationResult } = require('express-validator');
const path = require('path');
const Category = require('../models/category');
const qr = require('qrcode');

exports.getAllCategories = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 12;

    let totalItems;

    Category.find()
        .countDocuments()
        .then(result => {
            totalItems = result;

            return Category.find()
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {
            const response = {
                message: 'Get All Categories Success',
                category: result,
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

exports.getCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId)
        .then(result => {
            if (!result) {
                const error = new Error('Category not found');
                error.errorStatus = 404;
                throw error;
            }
            const response = {
                message: 'Get Category Success',
                category: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.getCategoryFromEvent = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 12;
    const eventId = req.params.eventId;

    Category.find({ eventId: eventId })
        .countDocuments()
        .then(result => {
            if (result <= 0) {
                const error = new Error('Categories not found');
                error.errorStatus = 404;
                throw error;
            }

            totalItems = result;

            return Category.find({ eventId: eventId })
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {

            const response = {
                message: 'Get Categories Success',
                categories: result,
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

exports.postCategory = async (req, res, next) => {

    const tickets = req.body.tickets;
    let arrResult = [];
    let index = 0;
    for (const ticket of tickets) {
        const eventId = req.body.eventId;
        const categoryName = ticket.categoryName;
        const categoryDescription = ticket.categoryDescription;
        const categoryPrice = ticket.categoryPrice;
        const categoryStock = ticket.categoryStock;
        let idNow = '';


        const PostCategory = new Category({
            eventId: eventId,
            categoryName: categoryName,
            categoryDescription: categoryDescription,
            categoryPrice: categoryPrice,
            categoryStock: categoryStock,
        });

        await PostCategory.save()
            .then(result => {
                response = {
                    category: result
                };

                arrResult.push(response);
                idNow = result._id;
                idNow = idNow.toString();

                let dirFile = generateQr(idNow);

                Category.findById(idNow)
                .then(result => {
                    if (!result) {
                        const error = new Error('Category not found');
                        error.errorStatus = 404;
                        throw error;
                    }

                    result.qrPath = dirFile;

                    return result.save();
                })
                .then(result => {

                    const responseQr = {
                        message: 'Update Category Success',
                        event: result
                    };

                })
                .catch(err => {
                    console.log('err: ', err);
                })


            })
            .catch(err => {
                console.log('err: ', err);
            })



        index = index + 1;
    }
    const finalResponse = {
        message: 'Create Categories Success',
        categories: arrResult
    };

    res.status(201).json(finalResponse);

}

exports.generateQrTemp = (req, res, next) => {

    generateQr('0192019')

    const result = {
        message: 'done',
    }
    res.status(200).json(result)
}

const generateQr = (idCategory) => {
    
    const dirFile = `public/qr/${idCategory}.png`
    qr.toFile(dirFile, idCategory, function (err) {
        if(err) return console.error(err);
    })

    return dirFile
};