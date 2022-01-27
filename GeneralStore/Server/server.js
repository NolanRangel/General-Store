import express from 'express'
import dotenv from 'dotenv'
import mongoose from './config/mongoose.config.js'


import productRoutes from './routes/productRoutes.js'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'


const uri = `mongodb+srv://rang1nol:Caliber1nol@generalstore.5m5sn.mongodb.net/GeneralStore?retryWrites=true&w=majority`


dotenv.config()
mongoose.connect(`${uri}`)

const app = express();






app.get('/', (req, res) => {
    res.send('API is running')
})


app.use('/api/products', productRoutes)


// links to error middleware / did not update get one with errorMiddleware
// app.use(notFound)
// app.use(errorHandler)




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

