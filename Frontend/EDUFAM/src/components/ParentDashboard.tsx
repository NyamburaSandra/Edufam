import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    navigate('/welcome');
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3">Parent Dashboard</h2>
      <p>Welcome to your Parent Dashboard! Here you can manage your children's education.</p>
      {/* Add more dashboard content here */}
    </Container>
  );
};

export default ParentDashboard;