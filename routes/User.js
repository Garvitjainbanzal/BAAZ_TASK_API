const express = require('express')
const router = express.Router()
const { register, login, fetchUserData, updateUserData, logout } = require('../controllers/UserController')
router.post('/register', register)
router.post('/login', login)
router.get('/user', fetchUserData)
router.put('/user', updateUserData)
router.post('/logout', logout)

module.exports = router