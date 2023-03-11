const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const faqController = require('../controllers/faq')

// [POST]: /v1/faq/post
router.post('/Faq', [
    body('question').isLength({min: 5}).withMessage('Question tidak sesuai'),
    body('answer').isLength({min: 5}).withMessage('Jawaban tidak sesuai')], 
    faqController.postFaq);
router.get('/Faqs', faqController.getAllFaq);
router.get('/Faq/:faqId', faqController.getFaqById);
router.put('/Faq/:faqId', [
    body('question').isLength({min: 5}).withMessage('Question tidak sesuai'),
    body('answer').isLength({min: 5}).withMessage('Jawaban tidak sesuai')], 
    faqController.updateFaq);
router.delete('/Faq/:faqId', faqController.deleteFaq);

module.exports = router;