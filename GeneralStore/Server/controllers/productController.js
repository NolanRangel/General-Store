import Product from '../models/productModel.js'



//  get all products
const getProducts = (req, res) => {
    const products = Product.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err))
}

// get one product by id
const getProductById = (req, res) => {
    const product = Product.findById({ _id: req.params.id })
        .then(product => res.json({ product: product }))
        .catch(err => res.json(err))
}




export { getProducts, getProductById }