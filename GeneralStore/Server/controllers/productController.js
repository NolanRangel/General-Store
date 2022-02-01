import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'






//  get all products
const getProducts = (req, res) => {
    const products = Product.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err))
}



// get one product by id
// const getProductById = (req, res) => {
//     const product = Product.findById({ _id: req.params.id })
//         .then(product => res.json({ product: product }))
//         .catch(err => res.json(err))
// }

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// create new review
// POST /api/products:id/reviews
// private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)


    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product has already been reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ mesage: 'Review added' })
    }
    else {
        res.status(404)
        throw new Error('Review not added')
    }
})




export { getProducts, getProductById, createProductReview }