import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import {NavBarIcon} from './NavBarStyles'



export const NavBar = () => {
   return <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <NavBarIcon  alt="learnow-logo" src={require('../images/learnow icon.png')}/>
                </Navbar.Brand>
                {/* <NavBarIcon  alt="learnow-logo" src={require('../images/learnow icon.png')}/> */}
                <Nav className="mr-auto">
                    <Nav.Link  href="#activity">Your Activity</Nav.Link>
                    <Nav.Link href="#results">Your Results</Nav.Link>
                    <Nav.Link href="#recommendations">Recommendations</Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link href="#signIn">Sign In</Nav.Link>
                    <Nav.Link href="#register">Register </Nav.Link>
                </Nav>
            </Navbar>
            
  </div>
}
