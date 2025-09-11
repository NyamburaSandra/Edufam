import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, InputGroup, Dropdown } from 'react-bootstrap';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const CustomNavbar: React.FC = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);

  return (
    <Navbar className="bg-edufam-dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          {/* Logo */}
          <span className="ml-2 text-xl font-bold">EDUFAM</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {/* Search Icon and Bar */}
            <Nav.Item className="d-flex align-items-center">
              <Button variant="link" onClick={() => setSearchVisible(!isSearchVisible)} className="text-white">
                <i className="bi bi-search"></i> {/* Placeholder for Bootstrap Icon */}
              </Button>
              {isSearchVisible && (
                <InputGroup className="ms-2">
                  <FormControl
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <Button variant="outline-secondary" className="text-white">
                    <i className="bi bi-arrow-right"></i>
                  </Button>
                </InputGroup>
              )}
            </Nav.Item>

            {/* Notifications */}
            <Nav.Item className="d-flex align-items-center">
              <Button variant="link" className="text-white position-relative">
                <i className="bi bi-bell fs-4"></i> {/* Placeholder for Bootstrap Icon */}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Button>
            </Nav.Item>

            {/* User Account */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;