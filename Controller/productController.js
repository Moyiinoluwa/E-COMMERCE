const asyncHandler = require('express-async-handler')
const Product = require('../Model/productModel')
const Category = require('../Model/categoryModel')




//add new product
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, image, countInStock, description, richDescription,
            brand, price, rating, numReviews, isFeatured, category } = req.body;

        //validate if the category is valid
        const categoryId = req.params.id
        const categorry = await Category.findById(categoryId)
    
        if (!categorry) {
            return res.status(400).json({ message: 'cant find category' })
        }

        const product = new Product({
            name,
            description,
            richDescription,
            image,
            brand,
            countInStock,
            price,
            rating,
            numReviews,
            isFeatured,
            category: categoryId
        })

        await product.save()

        return res.status(200).json(product)

    } catch (error) {
        throw error
    }
});

//get all products
const productList = asyncHandler(async (req, res) => {
    try {
        const product = await Product.find()

        res.status(200).json(product)

    } catch (error) {
        throw error
    }
});

//get a particular product
const getProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ message: 'invalid product' })
        } else {
            res.status(200).json(product)
        }

    } catch (error) {
        throw error
    }
})

//update a product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        //validate the category before updating it
        const categorry = await Category.findById(req.category.body)
        if (!categorry) {
            res.status(400).json({ message: 'no category' })
        }

        const { name, image, countInStock, description, richDescription,
            brand, price, rating, numReviews, isFeatured, category } = req.body;

        const product = await Product.findByIdAndUpdate(req.params.id)
        if (!product) {
            res.status(404).json({ message: 'cant update product' })
        }
        //update and save to database
        product.name = name
        product.description = description
        product.richDescription = richDescription
        product.image = image
        product.brand = brand
        price.countInStock = countInStock
        product.price = price
        product.rating = rating
        product.numReviews = numReviews
        product.isFeatured = isFeatured
        product.category = category

        await product.save()

        res.status(200).json(product)

    } catch (error) {
        throw error
    }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)
        if (!product) {
            res.status(400).json({ message: 'cant delete product' })
        }

        const exit = await Product.deleteOne({ _id: id })
        res.status(200).json({ message: 'product deleted' })

    } catch (error) {
        throw error
    }
});

module.exports = {
    addProduct,
    productList,
    getProduct,
    updateProduct,
    deleteProduct
}