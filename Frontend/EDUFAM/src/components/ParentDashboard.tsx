import React from 'react';
import { Container } from 'react-bootstrap';

const ParentDashboard: React.FC = () => {
  return (
    <Container className="my-4">
      <h2 className="mb-3">Parent Dashboard</h2>
      <p>Welcome to your Parent Dashboard! Here you can manage your children's education.</p>
      {/* Add more dashboard content here */}
    </Container>
  );
};

export default ParentDashboard;