import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../styles/searchBoxStyle.css'




const SearchBox = ({ history }) => {
    const [keyWord, setKeyWord] = useState('')
    const [active, setActive] = useState(false)



    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord.trim()) {
            history.push(`/search/${keyWord}`)
        }
        else {
            history.push(`/`)
        }
    }

    const clickHandler = () => {
        setActive(!active);

    }

    return <Form onSubmit={submitHandler} className={`search ${active ? "active" : ""}`}>
        <div >
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder='Search Products..'
                className='input-search'>
            </Form.Control>
            <Button type='submit'
                className='btn-search fas fa-search'
                variant='outline-success'
                onMouseEnter={clickHandler}
            >
            </Button>
        </div>



    </Form >;


};




export default SearchBox;
