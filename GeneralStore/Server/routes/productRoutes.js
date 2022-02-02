import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
    createProductReview,
    getTopProducts,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'


// home gets all
// GET /api/products
// public
router.route('/').get(getProducts)

// create new review
// POST /api/products:id/reviews
// private
router.route('/:id/reviews').post(protect, createProductReview)

// get top rated products
// GET /api/products/top
// public
router.get('/top', getTopProducts)


// get one product
// GET /api/products/:id
// public
router.route('/:id').get(getProductById)





export default router