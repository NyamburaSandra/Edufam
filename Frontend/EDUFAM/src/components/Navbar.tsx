import React, { useState } from 'react';
import { Container, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const CustomNavbar: React.FC = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);

  return (
    <Container>
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
    </Container>
  );
};

export default CustomNavbar;