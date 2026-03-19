import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";

function P76Layout() {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>  
                        <Nav.Link as={Link} to="history">History</Nav.Link>
                        <Nav.Link as={Link} to="recommendation">Game Recommendations</Nav.Link>    
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <Outlet/>
            </div>
        </div>
    );
}

export default P76Layout;