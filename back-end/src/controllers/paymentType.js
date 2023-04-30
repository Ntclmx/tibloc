

exports.getAllPaymentTypes = (req, res, next) => {
    const currPage = req.query.page || 1;
    const perPage = req.query.perPage || 12;

    let totalItems;

    PaymentType.find()
        .countDocuments()
        .then(result => {
            totalItems = result;

            return PaymentType.find()
                .skip((parseInt(currPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {
            const response = {
                message: 'Get All Payment Type Success',
                paymentType: result,
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

exports.getPaymentType = (req, res, next) => {
    const paymentTypeId = req.params.paymentTypeId;
    PaymentType.findById(paymentTypeId)
        .then(result => {
            if (!result) {
                const error = new Error('Payment Type not found');
                error.errorStatus = 404;
                throw error;
            }
            const response = {
                message: 'Get Payment Tyoe Success',
                paymentType: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.postPaymentType = (req, res, next) => {

    if(!req.files) {
        const err = new Error('Image Must Be Uploaded');
        err.errorStatus = 422;
        throw err;
    }

    const paymentTypeName = req.body.paymentTypeName;
    const paymentTypeLogo = req.files[0].path;
    const paymentTypeKind = req.body.paymentTypeKind;
    
    const PostPaymentType = new PaymentType({
        paymentTypeName : paymentTypeName,
        paymentTypeLogo : paymentTypeLogo,
        paymentTypeKind : paymentTypeKind
    });

    PostPaymentType.save()
        .then(result => {
            const response = {
                message: 'Create Payment Type Success',
                paymentType: result
            };

            res.status(201).json(response);
        })
        .catch(err => {
            console.log('err: ', err);
        })

}