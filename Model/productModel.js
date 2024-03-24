const monogoose = require('mongoose')

const productSchema = monogoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    richDescription: {
        type: String,
        default: ''
    },

    image: {
        type: String,
        default: ''
    },

    images: [{
        type: String
    }],

    brand: {
        type: String,
        default: ''
    },

    price: {
        type: Number,
        default: 0
    },

    category: {
        type: monogoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    rating: {
        type: Number,
        default: 0
    }, 

    numReviews: {
        type: Number,
        default: false
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

//to acces the id easily on the frontend
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

productSchema.set('toJSON', {
    virtuals: true
})
module.exports = monogoose.model('Product', productSchema) 