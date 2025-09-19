
import React, { useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

type EdufamUser = {
  id: number;
  type: 'teacher' | 'student' | 'parent';
  name: string;
  email: string;
  studentId?: string;
  class?: string;
  subject?: string;
  status?: 'pending' | 'approved' | 'rejected';
  childId?: number;
  children?: string[];
  dateAdded?: string;
};
import { useAuth } from '../../context/useAuth';


const ChildInformationView: React.FC = () => {
  // Get all users and filter for current parent's children
  const users: EdufamUser[] = JSON.parse(localStorage.getItem('edufam_users') || '[]');
  const { user } = useAuth();

  // Find the logged-in parent by email (from AuthContext)
  const currentParent = users.find((u: EdufamUser) => u.type === 'parent' && u.email === user?.email);

  // Get children based on parent's children array
  const children: EdufamUser[] = currentParent?.children && currentParent.children.length > 0
    ? users.filter((u: EdufamUser) => u.type === 'student' && currentParent.children!.includes(u.studentId || ''))
    : [];

  const [selectedChild, setSelectedChild] = useState(children[0] || null);

  if (children.length === 0) {
    return (
      <Card>
        <Card.Header><h5>Child Information</h5></Card.Header>
        <Card.Body>
          <div className="text-center py-4">
            <i className="bi bi-person-plus" style={{ fontSize: '3rem', color: '#6c63ff' }}></i>
            <h6 className="mt-3">No Children Found</h6>
            <p>No children are linked to your account. Please contact the school administration.</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {/* Children Selector */}
      {children.length > 1 && (
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Select Child</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              {children.map((child: EdufamUser) => (
                <Col md={6} lg={4} key={child.id} className="mb-3">
                  <Card
                    className={`child-selector-card ${selectedChild?.id === child.id ? 'selected' : ''}`}
                    style={{
                      cursor: 'pointer',
                      border: selectedChild?.id === child.id ? '2px solid #6c63ff' : '1px solid #dee2e6',
                      transform: selectedChild?.id === child.id ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedChild(child)}
                  >
                    <Card.Body className="text-center">
                      <h6 className="mb-1">{child.name || 'Student Name'}</h6>
                      <small className="text-muted">ID: {child.studentId || child.id}</small><br />
                      <small className="text-muted">Class: {child.class || 'Class 1'}</small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Selected Child Details */}
      {selectedChild && (
        <>
          {/* Basic Information */}
          <Card className="mb-4">
            <Card.Header style={{ background: 'linear-gradient(90deg, #6c63ff 0%, #1e0a3c 100%)', color: 'white' }}>
              <h5 className="mb-0">Child Profile - {selectedChild.name || 'Student Name'}</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <h6><i className="bi bi-person me-2"></i>Basic Information</h6>
                      <p><strong>Full Name:</strong> {selectedChild.name || 'Student Name'}</p>
                      <p><strong>Student ID:</strong> {selectedChild.studentId || selectedChild.id}</p>
                      <p><strong>Class:</strong> {selectedChild.class || 'Class 1'}</p>
                      <p><strong>Status:</strong> <Badge bg="success">Active</Badge></p>
                    </Col>
                    <Col md={6}>
                      <h6><i className="bi bi-calendar me-2"></i>School Information</h6>
                      <p><strong>Date Enrolled:</strong> {selectedChild.dateAdded || '2025-01-15'}</p>
                      <p><strong>Academic Year:</strong> 2025</p>
                      <p><strong>Term:</strong> Term 3</p>
                      <p><strong>School:</strong> EDUFAM Academy</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default ChildInformationView;
