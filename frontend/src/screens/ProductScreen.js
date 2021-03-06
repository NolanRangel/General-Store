import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Rating from '../components/Rating'
import Loader from '../components/Loader';
import Message from '../components/Message'
import Meta from '../components/Meta'





const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    // allows for dispatch to be used
    const dispatch = useDispatch()

    //  grabs product details from the current state in the store
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // console.log(product.reviews);


    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    // grabs the logged in users info from the current state in the store
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        window.scrollTo(0, 0)
        if (successProductReview) {
            // alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successProductReview])



    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }





    return <div className=''>
        <Link className='btn btn-light my-3 ' to='/'>
            Go Home
        </Link>
        {loading
            ? <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Meta title={product.name} />
                        <Row className='d-flex justify-content-center'>
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
                                                                // Array constructor spreads the in stock by the keys and then maps over them adding one to each index to give an actual value
                                                                // google Array constructor js
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

                        < Row className='d-flex justify-content-center'>
                            <Col md={6}>
                                <h2 className='mx-3 text-light'>Reviews</h2>
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
                                    <ListGroup.Item>
                                        <h2>Write a Customer Review</h2>
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}
                                        </Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Select..</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Great</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className='my-3' type='submit' variant='primary'>
                                                    Submit
                                                </Button>
                                            </Form>
                                        )
                                            :
                                            <Message>Please
                                                <Link to='/login' className='mx-2'>sign in</Link>to write a review
                                            </Message>}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </ Row>
                    </>

                )}
    </div >;


};

export default ProductScreen;
