const mongoose = require('mongoose')


const connectdb = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_URL)
        console.log('conneted to db')
    } catch (error) {
        throw error
    }
}


module.exports = connectdb