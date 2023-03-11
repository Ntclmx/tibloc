const {validationResult} = require('express-validator');
const Faq = require('../models/faq');
 
exports.postFaq = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // console.log('err: ', errors);
        // res.status(400).json({
        //     message: 'Request Error',
        //     data: null,
        // })
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const question = req.body.question;
    const answer = req.body.answer;

    const Posting = new Faq({
        question: question,
        answer: answer
    })

    Posting.save()
    .then(result => {
        // const result = {
        //     message: 'Create FAQ Success',
        //     data: result
        // }
        // res.status(201).json(result);
        res.status(201).json({
            message: 'Create FAQ Success',
            data: result
        });
    })
    .catch(err => {
        console.log('err: ', err)
    });
}

exports.getAllFaq = (req, res, next) => {
    Faq.find()
    .then(result => {
        res.status(200).json({
            message: 'Get All FAQ Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getFaqById = (req, res, next) => {
    const faqId = req.params.faqId;
    Faq.findById(faqId)
    .then(result => {
        if(!result){
            const error = new Error('Faq tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateFaq = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const question = req.body.question;
    const answer = req.body.answer;
    const faqId = req.params.faqId;

    Faq.findById(faqId)
    .then(faqPost => {
        if(!faqPost){
            const error = new Error('Faq tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        faqPost.question = question;
        faqPost.answer = answer;

        return faqPost.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Data berhasil diupdate',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteFaq = (req, res, next) => {
    const faqId = req.params.faqId;

    Faq.findById(faqId)
    .then(faqPost => {
        if(!faqPost){
            const error = new Error('Faq tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

       return Faq.findByIdAndRemove(faqId);
    })
    .then(result => {
        res.status(200).json({
            message: 'Data berhasil didelete',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}