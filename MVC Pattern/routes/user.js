const express = require('express');
const router = express.Router();

const {handleGetAllUsers, handleCreateUser, handlegetUserById, handleUpdateUserById, handleDeleteUserById} = require('../controllers/user');

router.get('/', handleGetAllUsers );

router.post('/', handleCreateUser);

router.get('/:id', handlegetUserById);

router.patch('/:id', handleUpdateUserById);

router.delete('/:id', handleDeleteUserById);

module.exports = router;