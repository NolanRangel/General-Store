import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
} from '../controllers/productController.js'


// home gets all
// GET /api/products
// public
router.route('/').get(getProducts)

// get one product
// GET /api/products/:id
// public
router.route('/:id').get(getProductById)



export default router