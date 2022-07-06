import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,

} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'



//  create new order
//  POST /api/orders
// private (needs Bearer token)
router.route('/').post(protect, addOrderItems)

// get logged in users orders
// GET /api/orders/myorders
// private
router.route('/myorders').get(protect, getMyOrders)

// make sure to be at the bottom
// GET /api/orders/:id
// private (needs Bearer token)
router.route('/:id').get(protect, getOrderById)

// update order to paid
// GET /api/orders/:id/pay
// private
router.route('/:id/pay').put(protect, updateOrderToPaid)






export default router