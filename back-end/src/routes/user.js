const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user");
const { verifyToken } = require("../middleware/AuthUser");

const router = express.Router();

// router.get('/users', verifyUser, adminOnly, getAllUsers);
router.get('/users', getAllUsers);
router.get('/user', verifyToken, getUserById);
router.post('/users', createUser);
// router.patch('/users/:id', verifyUser, adminOnly, updateUser);
// router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

module.exports = router;