const express = require('express')
const router = express.Router()
const Controller = require('../Controller/categoryController')



//get all catergories
router.get('/get', Controller.getAllCategory)

//get a category
router.get('/get/:id', Controller.getCategory)

//add a new category
router.post('/add-category', Controller.createCategory)

//delete
router.delete('/delete/:id', Controller.deleteCategory)

//update
router.put('/update/:id', Controller.updateCategory)


module.exports = router