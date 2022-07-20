import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';


import Rating from '../components/Rating'


const Product = ({ product }) => {
    // console.log(product._id);



    return <div className=''>


        <Card className='container px-3 col-7 mt-5 py-5 shadow-lg d-flex rounded' style={{ width: '18rem' }}>

            <Link to={`/product/${product._id}`} className=' mx-4'>
                <Card.Img src={product.image} variant='top' style={{ width: '200px', height: 'auto' }} className='rounded ' />
            </Link>

            <Card.Body >

                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>

                <Card.Text as='div'>

                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`} />
                </Card.Text>

                {/* shows red as error but runs */}
                <Card.Text as='h3'>${product.price}</Card.Text>

            </Card.Body>
        </Card>

    </div>;
};

export default Product;
