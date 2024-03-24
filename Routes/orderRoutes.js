const express = require('express')
const router = express.Router()
const Controller = require('../Controller/oderController')


//post an order
router.post('/send', Controller.postOrder)







module.exports = router;