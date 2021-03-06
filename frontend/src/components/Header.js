import React from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'


const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const logoutHandler = () => {
        // console.log('logout');
        dispatch(logout())
    }


    return <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
            <Container className=' '>
                <LinkContainer to='/'>
                    <Navbar.Brand>General Store</Navbar.Brand>

                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>

                    <Route render={({ history }) => <SearchBox history={history} />} />
                    {/* ml-auto to spread nav header */}
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart mx-1'></i>Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='userName'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer onClick={logoutHandler} to='/login'>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                                {/* <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item> */}
                            </NavDropdown>
                        ) :
                            <LinkContainer to='/login'>
                                <Nav.Link ><i className='fas fa-user'></i>Sign In
                                </Nav.Link>
                            </LinkContainer>}



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    </header >


};

export default Header;
