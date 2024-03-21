const express = require('express')
const router = express.Router()
const Controller = require('../Controller/productController')



//get all product
router.get('/get', Controller.productList)

//get a product
router.get('/get/:id', Controller.getProduct)

//create product
router.post('/add', Controller.addProduct)

//update product
router.put('/update/:id', Controller.updateProduct)

//delete 
router.delete('/delete/:id', Controller.deleteProduct)

module.exports = router;