import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Rating from '../components/Rating'
import Loader from '../components/Loader';
import Message from '../components/Message'





const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()


    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    console.log(product.reviews);

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
        // console.log();
    }, [dispatch, match])



    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }




    return <div>
        <Link className='btn btn-dark my-3' to='/'>
            Go Back
        </Link>
        {loading
            ? <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Row>
                            <Col md={6} style={{ width: '250px', heigth: 'auto' }}>
                                {/* fluid shrinks img into its container */}
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3} style={{ width: '250px', heigth: 'auto' }}>
                                {/* variant flush takes away the border */}
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h4>{product.name}</h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item className='productscreen-des'>
                                        Description: ${product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3} >
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>{product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}
                                            >

                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        < Row >
                            <Col md={6}>
                                <h2 className='mx-3'>Reviews</h2>
                                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map((review, index) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>


                            </Col>
                        </ Row>


                    </>

                )}
    </div >;


};

export default ProductScreen;
