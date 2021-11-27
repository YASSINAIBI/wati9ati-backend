const express = require('express')
const {addDocumentsPersonnel} = require('../controllers/servicesController')
const router = express.Router()

router.post('/add', addDocumentsPersonnel)

module.exports = router
