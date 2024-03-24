const asyncHandler = require('express-async-handler')
const Product = require('../Model/productModel')
const Category = require('../Model/categoryModel')




//add new product
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, image, countInStock, description, richDescription,
            brand, price, rating, numReviews, isFeatured } = req.body;

        //validate if the category is valid
        const categoryId = req.params.id
        const category = await Category.findById(categoryId)

        if (!category) {
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
        
        //const product = await Product.find().select('name brand -_id')
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
        // const categorry = await Category.findById(req.params.id)
        // if (!categorry) {
        //     res.status(400).json({ message: 'no category' })
        // }

        const { name, image, countInStock, description, richDescription,
            brand, price, rating, numReviews, isFeatured } = req.body;

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

        await product.save()

        res.status(200).json(product)

    } catch (error) {
        throw error
    }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        //get the product to be deleted
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            res.status(404).json({ message: 'cannot delete product' })
        } else {
            res.status(200).json({ message: 'product deleted' })
        }

    } catch (error) {
        throw error
    }
});


//count all products
const countProduct = asyncHandler(async (req, res) => {
    try {
        const productCount = await Product.countDocuments()

        if (productCount === undefined) {
            res.status(404).json({ message: 'cant count product' })
        } else {
            res.status(200).json({ count: productCount })
        }

    } catch (error) {
        throw error
    }
});

//Get all featured product
const featuredProduct = asyncHandler(async (req, res) => {
    try {

        const product = await Product.find({ isFeatured: true })

        if (!product) {
            res.status(404).json({ message: 'No featured product' })
        } else {
            res.status(200).json(product)
        }
    } catch (error) {
        throw error
    }
});


//get limited featured product
const limitedFeature = asyncHandler(async(req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0

        const product = await Product.find({ isFeatured: true}).limit(+count)

        if(!product) {
            res.status(404).json({ message: 'cant get featured products'})
        }

        res.status(200).json(product)


    } catch (error) {
        throw error
    }
});

//Get product by category with query
const productCategory = asyncHandler(async (req, res) => {
    try {
        //this object filters products based on category
        let filter = {}

        //check if the query request has a category parameter
        if(req.query.category) {
            //if the category exist, split it by comma
            filter = { category: req.query.category.split(',')}
        }

        //find all products, populate the category field
    const product = await Product.find(filter).populate('category')

    if(!product) {
        res.status(400).json({ message: 'no products'})
    }

    res.status(200).json(product)

    } catch (error) {
        throw error
    }
})





module.exports = {
    addProduct,
    productList,
    getProduct,
    updateProduct,
    deleteProduct,
    countProduct,
    featuredProduct,
    limitedFeature,
    productCategory
}