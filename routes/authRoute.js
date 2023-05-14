const express = require('express');
const router = express.Router();
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updateUser } = require('../controller/userCtrl');

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUser);
router.get('/:id', getaUser);
router.delete('/:id', deleteaUser);
router.put('/:id', updateUser);

module.exports = router;
