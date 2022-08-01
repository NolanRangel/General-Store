import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions';





const HomeScreen = ({ match }) => {
    const keyWord = match.params.keyWord
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList




    useEffect(() => {
        dispatch(listProducts(keyWord, pageNumber))
        window.scrollTo(0, 0)
    }, [dispatch, keyWord, pageNumber])



    return <>
        <Meta />
        {!keyWord ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Home</Link>}
        <h1 className=''> Latest Products</h1>

        {loading ? <Loader>Loading...</Loader>
            : error
                ? <Message variant='danger'>{error}</Message>
                :
                <>
                    <Paginate pages={pages} page={page} keyWord={keyWord ? keyWord : ''} />
                    <Row className='mb-5 gap-5 d-flex justify-content-center'>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                </>
        }

    </>
};

export default HomeScreen;
