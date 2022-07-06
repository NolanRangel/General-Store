import express from 'express'
import dotenv from 'dotenv'
import mongoose from './config/mongoose.config.js'
import morgan from 'morgan'
import path from 'path'


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


// const uri = `mongodb+srv://rang1nol:Caliber1nol@generalstore.5m5sn.mongodb.net/test`
const uri = `mongodb+srv://rang1nol:Caliber1nol@generalstore.5m5sn.mongodb.net/GeneralStore?retryWrites=true&w=majority`


dotenv.config()
mongoose.connect(`${uri}`)

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan())
}

// allows us to accept JSON data in the body (authUser)
app.use(express.json())




// app.get('/', (req, res) => {
//     res.send('API is running')
// })


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// could possibly work for cork deployment
if (process.env.NODE_ENV === 'production') {
    app.use('/static', express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}


// links to error middleware / did not update get one with errorMiddleware
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

