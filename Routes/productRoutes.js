const express = require('express')
const router = express.Router()
const Controller = require('../Controller/productController')
const productUpload = require('../Middleware/productImage')



//get all product
router.get('/get', Controller.productList)

//get a product
router.get('/get/:id', Controller.getProduct)

//add product to category id
router.post('/add/:id', Controller.addProduct)

//update product
router.put('/update/:id', Controller.updateProduct)

//delete 
router.delete('/delete/:id', Controller.deleteProduct)

//count product
router.get('/count', Controller.countProduct)

//featured product
router.get('/featured', Controller.featuredProduct)

//limited featured product
router.get('/featured/:count', Controller.limitedFeature)

//get produtcs by category
router.get('/category', Controller.productCategory)

//upload product image
router.patch('/upload', productUpload, Controller.upload)



module.exports = router;