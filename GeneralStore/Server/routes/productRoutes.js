import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'


// home gets all
// GET /api/products
// public
router.get('/', (req, res) => {
    const products = Product.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err))
})
// get one product
// GET /api/products/:id
// public
router.get('/:id', (req, res) => {
    const product = Product.findById({ _id: req.params.id })
        .then(product => res.json({ product: product }))
        .catch(err => res.json(err))
})



export default router