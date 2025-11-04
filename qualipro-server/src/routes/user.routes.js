const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/token.middleware');

router.post('/login', userController.login);
router.post('/refresh-token', [authMiddleware], userController.refreshToken);
router.post('/users', [authMiddleware], userController.createUser);
router.get('/users', [authMiddleware], userController.getUsers);
router.get('/users/:id', [authMiddleware], userController.getUser);
router.patch('/users/:id', [authMiddleware], userController.updateUser);
router.delete('/users/:id', [authMiddleware], userController.deleteUser);

module.exports = router;