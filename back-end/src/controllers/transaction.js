
const midtransClient = require('midtrans-client');
const Category = require('../models/category');
const Nft = require('../models/nft');

let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-pIuxlLTmWcWqvzq1Wyw6oEGZ',
    clientKey: 'SB-Mid-client-tvJ5kSu7Xsdq6d6M'
});

exports.getAllTransactions = (req, res, next) => {
    const currPage = req.params.page || 1;
    const perPage = req.params.perPage || 12;

    let totalItems;

    Transaction.find()
        .countDocuments()
        .then(result => {
            totalItems = result;

            return Transaction.find()
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {
            const response = {
                message: 'Get All Transaction Success',
                transaction: result,
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

exports.getTransaction = (req, res, next) => {
    const transactionId = req.params.transactionId;
    Transaction.findById(transactionId)
        .then(result => {
            if (!result) {
                const error = new Error('Transaction not found');
                error.errorStatus = 404;
                throw error;
            }
            const response = {
                message: 'Get Transaction Success',
                transaction: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.getTransactionFromUser = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 12;

    const userId = req.params.userId;

    Transaction.find({ userId: userId })
        .countDocuments()
        .then(result => {
            if (result <= 0) {
                const error = new Error('Transactions not found');
                error.errorStatus = 404;
                throw error;
            }
            totalItems = result;

            return Transaction.find({ userId: userId })
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {

            const response = {
                message: 'Get Transactions Success',
                transactions: result,
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

exports.postTransaction = (req, res, next) => {

    const categoryId = req.body.categoryId;
    const userId = req.body.userId;
    const transactionAmount = req.body.transactionAmount;
    const paymentWith = req.body.paymentWith;

    const PostTransaction = new Transaction({
        categoryId: categoryId,
        userId: userId,
        transactionAmount: transactionAmount,
        paymentWith: paymentWith
    });

    PostTransaction.save()
        .then(result => {

            let paymentParamenter = "";

            if (paymentWith === 'gopay') {
                paymentParamenter = {
                    "payment_type": "gopay",
                    "transaction_details": {
                        "order_id": result._id,
                        "gross_amount": transactionAmount
                    },
                    "custom_expiry": {
                        "expiry_duration": 60,
                        "unit": "minute"
                    }
                }

            } else {

                paymentParamenter = {
                    "payment_type": "bank_transfer",
                    "bank_transfer": {
                        "bank": paymentWith
                    },
                    "transaction_details": {
                        "order_id": result._id,
                        "gross_amount": transactionAmount
                    },
                    "custom_expiry": {
                        "expiry_duration": 60,
                        "unit": "minute"
                    }
                }

            }

            coreApi.charge(paymentParamenter)
                .then((chargeResponse) => {
                    let orderId = chargeResponse.order_id;
                    let transactionStatus = chargeResponse.transaction_status;
                    let paymentType = chargeResponse.payment_type;

                    Transaction.findById(orderId)
                        .then(result => {
                            if (!result) {
                                const error = new Error('Transaction not found');
                                error.errorStatus = 404;
                                throw error;
                            }

                            console.log(chargeResponse);

                            result.paymentStatus = transactionStatus;

                            if (paymentType == 'bank_transfer') {
                                result.paymentVA = chargeResponse.va_numbers[0].va_number;
                            }
                            else if (paymentType == 'gopay') {
                                for (const gopay_qr of chargeResponse.actions) {
                                    if (gopay_qr.name === 'generate-qr-code') {
                                        result.paymentQR = gopay_qr.url;
                                        break;
                                    }
                                }
                            }

                            return result.save();
                        })
                        .then(result => {

                            const response = {
                                message: 'Create Transaction Success',
                                transaction: result
                            };

                            res.status(201).json(response);
                        })
                        .catch(err => {
                            next(err);
                        })

                })
                .catch((e) => {
                    console.log('Error occured:', e.message);
                });;

        })
        .catch(err => {
            console.log('err: ', err);
        })
}

exports.updateTransaction = (req, res, next) => {
    coreApi.transaction.notification(req.body)
        .then((statusResponse) => {
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let paymentType = statusResponse.payment_type;

            Transaction.findById(orderId)
                .then(result => {
                    if (!result) {
                        const error = new Error('Transaction not found');
                        error.errorStatus = 404;
                        throw error;
                    }

                    console.log(statusResponse);
                    console.log(result);

                    if (transactionStatus == 'settlement') {
                        result.paymentStatus = transactionStatus;
                        result.ticketStatus = 'issued';
                        result.ticketQRPath = 'https://www.jqueryscript.net/images/Random-Pixel-Avatar-Image-Generator-With-jQuery-and-Canvas-gixi.jpg';
                        const catId = result.categoryId

                        Category.findById(catId)
                            .then(result => {
                                if (!result) {
                                    const error = new Error('Category not found');
                                    error.errorStatus = 404;
                                    throw error;
                                }

                                const minStock = result.categoryStock - 1
                                result.categoryStock = minStock;

                                return result.save();
                            })
                            .catch(err => {
                                console.log('err: ', err);
                            })

                    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
                        result.paymentStatus = transactionStatus;
                    }

                    return result.save();
                })
                .then(result => {

                    const response = {
                        message: 'Update Transaction Success',
                        transaction: result
                    };

                    res.status(200).json(response);
                })
                .catch(err => {
                    next(err);
                })


        });

}

exports.randomFunction = (req, res, next) => {

    randomNFT('6428fb4c2ad44fcd7539bf5c')

    const result = {
        message: 'done',
    }
    res.status(200).json(result)
}




