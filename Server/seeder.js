import mongoose from 'mongoose'
import dotenv from 'dotenv'


import users from './data/users.js'
import products from './data/products.js'


import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'


const uri = process.env.MONGO_URI;


dotenv.config()
mongoose.connect(`${uri}`)



const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        // array of created users
        const createdUsers = await User.insertMany(users)
        // grabs admin from list of users. [0] because its the first in the array
        const adminUser = createdUsers[0]._id
        // links the admin to all of the products
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        // inserts all the product data
        await Product.insertMany(sampleProducts)
        console.log('**Data imported**');
    } catch (error) {
        console.log(`**${error}**`);
        process.exit(1)
    }
}



const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('**Data destroyed**');
        process.exit()
    } catch (error) {
        console.log(`**${error}**`);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}