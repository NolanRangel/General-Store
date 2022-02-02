import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'




const SearchBox = ({ history }) => {
    const [keyWord, setKeyWord] = useState('')



    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord.trim()) {
            history.push(`/search/${keyWord}`)
        }
        else {
            history.push(`/`)
        }
    }


    return <Form onSubmit={submitHandler} inline className='d-flex mx-5'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyWord(e.target.value)}
            placeholder='Search Products..'
            className='mr-sm-2 ml-sm-5 mx-3 p-1'>
        </Form.Control>
        <Button type='submit' className='p-2' variant='outline-success'>
            Search
        </Button>



    </Form>;


};




export default SearchBox;
