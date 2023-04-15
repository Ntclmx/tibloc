const Admin = require('../models/admin');

exports.getAllAdmins = (req, res, next) => {
    Category.find()
        .then(result => {
            const response = {
                message: 'Get All Admin Success',
                admins: result,
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        });

}

exports.getAdmin = (req, res, next) => {
    const adminId = req.params.adminId;
    Admin.findById(adminId)
        .then(result => {
            if (!result) {

                const response = {
                    message: 'Admin Not Found',
                };

                res.status(404).json(response);
            }
            const response = {
                message: 'Get Admin Success',
                admin: result
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.getAdminFromAddress = (req, res, next) => {
    const publicAddress = req.params.publicAddress;

    Admin.find({ publicAddress: publicAddress })
        .countDocuments()
        .then(result => {
            if (result <= 0) {
                const response = {
                    message: 'Admin Not Found',
                };

                res.status(404).json(response);
            }


            return Admin.find({ publicAddress: publicAddress })
        })
        .then(result => {

            const response = {
                message: 'Get Categories Success',
                admin: result,
            };

            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        })
}

exports.postAdmin = async (req, res, next) => {

    const publicAddress = req.body.publicAddress;

    const PostAdmin = new Admin({
        publicAddress: publicAddress,
    });

    PostAdmin.save()
        .then(result => {
            const response = {
                message: 'Create Admin Success',
                admin: result
            };

            res.status(201).json(response);
        })
        .catch(err => {
            console.log('err: ', err);
        })

}
