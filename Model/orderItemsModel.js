const mongose = require('mongoose')


const orderItemSchema = mongose.Schema({
    quantity: {
        type: Number,
        required: true
    },

    product: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'Product',
    }

});

module.exports = mongose.model('OderItem', orderItemSchema)