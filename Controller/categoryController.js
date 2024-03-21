const asyncHandler = require('express-async-handler')
const Category = require('../Model/categoryModel')


//Get all categories
const getAllCategory = asyncHandler(async(req, res) => {
    try {
        const categoryList = await Category.find()

        res.status(200).json(categoryList)

    } catch (error) {
        throw error
    }
});

//get a category
const getCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) {
            res.status(404).json({ message: 'cant find category'})
        } else{
            res.status(200).json(category)
        }

    } catch (error) {
        throw error
    }
});

//add a category
const createCategory = asyncHandler(async(req, res) => {
    try {
        const { name, icon, color } = req.body;

        const category = new Category({
            name,
            color,
            icon
        })

        await category.save() 
        
        res.status(200).json(category)

    } catch (error) {
        throw error
    }
})

//update a category
const updateCategory = asyncHandler(async(req, res) => {
    try {
        const { name, color, icon } = req.body;

        const category = await Category.findByIdAndUpdate(req.params.id)
        if(!category) {
            res.status(404).json({ message: 'Cant update category'})
        }

        //update
        category.name = name
        category.color = color
        category.icon = icon 

        //save update to database
        await category.save()

        res.status(200).json(category)

    } catch (error) {
        throw error
    }
});

//remove a category
const deleteCategory = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)
        if(!category) {
            res.status(404).json({ message: 'Category not found'})
        }

        const remove = await Category.deleteOne({ _id: id })
        res.status(200).json({ message: 'category deleted'})

    } catch (error) {
        throw error
    }
});
module.exports = {
    getCategory,
    getAllCategory,
    createCategory,
    deleteCategory,
    updateCategory
}