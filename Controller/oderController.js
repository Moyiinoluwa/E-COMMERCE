const asyncHandler = require('express-async-handler')
const Order = require('../Model/orderModel')
const OrderItem = require('../Model/orderItemsModel')



//post an order
const postOrder = asyncHandler(async(req, res) => {
    try {
      
        const { orderItems, shippingAddress, city, phone, status, totalPrice, user } = req.body

         // Map the orderItems array to create and save OrderItem documents 
        const orderItemIds = orderItems.map(async item => {
            const orderItem = new OrderItem({
                quantity: item.quantity,
                product: item.product
            });
        

        // Save the saved OrderItem document
         await orderItem.save();

         return orderItem._id
    });

    //calculate the total price of one order
    const totalPrices = Promise.all(orderItemIds.map( async(item) => {
        const orderItem = await OrderItem.findById(item).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity 
        return totalPrice
    }));
      
    const totalPriice = totalPrices.reduce((a, b) => a + b, 0)


    console.log(totalPrices)


        const order = new Order({
            orderItems: orderItemIds,
            shippingAddress,
            city,
            phone,
            status,
            totalPrice: totalPriice,
            user
        })

        await order.save() 
        if(!order) {
            res.status(404).json({ message: 'cannot create order'})
        }

        res.status(200).json(order)

    } catch (error) {
        throw error
    }
});

//update order
//delete order

//Get the total sales for the day using $sum
const totalSales = asyncHandler(async(req, res) => {
    try {
        const sales = await Order.aggreate([
            { $group: {_id: null, sales : {$sum : '$totalPriice'}}}
        ])

        if(!sales) (
            res.status(404).json({ message: 'The order sales cannot be generated'})
        )

        res.status(200).json({ totalSale: sales})
        
    } catch (error) {
        throw error
    }
});
module.exports = {
    postOrder
}