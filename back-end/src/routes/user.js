const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

// router.get('/users', verifyUser, adminOnly, getAllUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

module.exports = router;