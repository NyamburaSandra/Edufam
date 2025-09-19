import React, { useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const ChildInformationView: React.FC = () => {
  // Get all users and filter for current parent's children
  const users = JSON.parse(localStorage.getItem('edufam_users') || '[]');

  // Find current parent
  const currentParent = users.find((user: any) => user.type === 'parent');

  // Get children based on parent's children array or find by parent email
  const getParentChildren = () => {
    if (currentParent?.children && currentParent.children.length > 0) {
      // Use parent's children array
      return users.filter((user: any) =>
        user.type === 'student' && currentParent.children.includes(user.studentId)
      );
    } else {
      // Fallback: find students by matching criteria or default students
      return users.filter((user: any) => user.type === 'student').slice(0, 2); // Show first 2 students as demo
    }
  };

  const children = getParentChildren();
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
              {children.map((child: any) => (
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
