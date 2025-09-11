import React from 'react';
// import { Container, Row, Col, InputGroup, Button, Form } from 'react-bootstrap';
import { Container, Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";


const Footer: React.FC = () => {
  return (
    <footer className="bg-edufam-dark text-white py-5 mt-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">EduConnect</h5>
            <p className="text-white">Bridging the communication gap between teachers and parents for student success.</p>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Features</a></li>
              <li><a href="#" className="text-white text-decoration-none">Testimonials</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
              <li><a href="#" className="text-white text-decoration-none">Support Center</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex mb-3">
              <Button variant="outline-light" className="rounded-circle me-2 social-icon facebook"><i className="bi bi-facebook"></i></Button>
              <Button variant="outline-light" className="rounded-circle me-2 social-icon twitter"><i className="bi bi-twitter-x"></i></Button>
              <Button variant="outline-light" className="rounded-circle me-2 social-icon instagram"><i className="bi bi-instagram"></i></Button>
              <Button variant="outline-light" className="rounded-circle social-icon linkedin"><i className="bi bi-linkedin"></i></Button>
            </div>
            <div className="mt-4">
              <p className="text-white">Subscribe to our newsletter</p>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <Button variant="primary">Subscribe</Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col className="text-center text-muted">
            <p className="text-white">&copy; {new Date().getFullYear()} EDUFAM. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;