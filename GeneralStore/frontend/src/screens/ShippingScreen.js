import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';




const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    // console.log(shippingAddress);

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()





    const submitHandler = (e) => {
        e.preventDefault()
        // console.log('submit');

        dispatch(saveShippingAddress({ address, city, zipCode, country }))
        history.push('/payment')
    }



    return <FormContainer>

        <CheckoutSteps step1 step2 />

        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control required type='text' placeholder='Enter Address..'
                    value={address} onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control required type='text' placeholder='Enter City..'
                    value={city} onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='zipCode'>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control required type='text' placeholder='Enter Zip Code..'
                    value={zipCode} onChange={(e) => setZipCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control required type='text' placeholder='Enter Country..'
                    value={country} onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>

    </FormContainer>;


};



export default ShippingScreen;
