const express = require('express')
const {signup, signin, getOneUser, signout, allUser, userById} = require('../controllers/userController')
const {userSignUpValidator} = require('../middllwares/userValidator')
const {requireSignIn, isAuth, isUser} = require('../middllwares/auth')
const router = express.Router()

router.post('/signup', userSignUpValidator, signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/all', allUser)

router.get('/:userId', requireSignIn, isAuth, isUser, getOneUser)
router.param('userId', userById)

module.exports = router

