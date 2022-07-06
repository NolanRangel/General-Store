import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'






//  get all products
// GET /api/products
// public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyWord = req.query.keyWord ? {
        name: {
            $regex: req.query.keyWord,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyWord })
    const products = await Product.find({ ...keyWord }).limit(pageSize).skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })

})


// get single product
// GET /api/products/:id
// public
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



// get top rated products
// GET /api/products/top
// public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5)
    console.log(products);

    res.json(products)

})




export {
    getProducts,
    getProductById,
    createProductReview,
    getTopProducts
}