import React from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const AdminView: React.FC = () => {
  // Mock admin data - replace with real auth data
  const adminData = {
    name: "Administrator",
    schoolName: "EDUFAM School",
    totalRevenue: 32500000, // 250,000 USD ≈ 32,500,000 KES (at ~130 KES/USD)
    pendingApprovals: 8,
    systemAlerts: 3
  };

  const users = JSON.parse(localStorage.getItem('edufam_users') || '[]');
  const students = users.filter((u: any) => u.type === 'student');
  const teachers = users.filter((u: any) => u.type === 'teacher');
  const parents = users.filter((u: any) => u.type === 'parent');
  const classes = [...new Set(students.map((s: any) => s.class))].length;
  const events = 5; // Example static value

  // Demo performance data
  const performance = {
    year: '2025',
    term: 'Term 3',
    score: 78, // out of 100
    trend: 'up', // 'up' or 'down'
    pdfUrl: '/public/performance-report-2025-term3.pdf',
  };

  return (
    <>
      <Card className="mb-4" style={{ backgroundColor: 'white', border: '1px solid #dee2e6' }}>
        <Card.Body>
          <h2 style={{ color: '#1e0a3c', fontWeight: 700 }}>Welcome, {adminData.name}!</h2>
          <p style={{ color: '#6c63ff', fontSize: '1.1em' }}>Manage {adminData.schoolName} efficiently with EDUFAM.</p>
          
          {/* Summary Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="mb-2">
                <Card.Body>
                  <h5>Students</h5>
                  <h3>{students.length}</h3>
                  <div style={{ fontSize: '0.95em', color: '#6c63ff' }}>
                    {(() => {
                      if (students.length === 0) return 'No students';
                      const classCounts: Record<string, number> = {};
                      students.forEach((s: any) => {
                        classCounts[s.class] = (classCounts[s.class] || 0) + 1;
                      });
                      const highestClass = Object.entries(classCounts).reduce((max, curr) => curr[1] > max[1] ? curr : max);
                      return `Largest: ${highestClass[0]} (${highestClass[1]})`;
                    })()}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-2">
                <Card.Body>
                  <h5>Teachers</h5>
                  <h3>{teachers.length}</h3>
                  <div style={{ fontSize: '0.95em', color: '#6c63ff' }}>
                    {(() => {
                      if (teachers.length === 0) return 'No teachers';
                      const subjectCounts: Record<string, number> = {};
                      teachers.forEach((t: any) => {
                        if (t.subject) subjectCounts[t.subject] = (subjectCounts[t.subject] || 0) + 1;
                      });
                      if (Object.keys(subjectCounts).length === 0) return '';
                      const highestSubject = Object.entries(subjectCounts).reduce((max, curr) => curr[1] > max[1] ? curr : max);
                      return `Most: ${highestSubject[0]} (${highestSubject[1]})`;
                    })()}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-2">
                <Card.Body>
                  <h5>Classes</h5>
                  <h3>{classes}</h3>
                  <div style={{ fontSize: '0.95em', color: '#6c63ff' }}>
                    Active classes
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-2">
                <Card.Body>
                  <h5>Revenue</h5>
                  <h3>KES {adminData.totalRevenue.toLocaleString()}</h3>
                  <div style={{ fontSize: '0.95em', color: '#6c63ff' }}>
                    This term
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* First Row: Pending Approvals and Recent Activity */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="mb-4 h-100">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0" style={{ color: '#1e0a3c' }}>Pending Approvals</h5>
                    <span className="badge bg-danger">{adminData.pendingApprovals}</span>
                  </div>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Teacher registration: Sarah Johnson</span>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Parent account: Michael Brown</span>
                      <small className="text-muted">1 day ago</small>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Fee waiver request: Class 5 Pearl</span>
                      <small className="text-muted">2 days ago</small>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 h-100">
                <Card.Header><h5 className="mb-0" style={{ color: '#1e0a3c' }}>Recent Activity</h5></Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Bulk SMS sent to all parents</span>
                      <small className="text-muted">30 mins ago</small>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Monthly report generated</span>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Fee collection updated</span>
                      <small className="text-muted">4 hours ago</small>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Second Row: School Performance and Fee Summary */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="mb-4 h-100">
                <Card.Header><h5 className="mb-0" style={{ color: '#1e0a3c' }}>School Performance</h5></Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h4 className="mb-0">{performance.score}%</h4>
                      <small className="text-muted">{performance.year} - {performance.term}</small>
                    </div>
                    <div className="text-end">
                      {performance.trend === 'up' ? (
                        <span style={{ color: 'green', fontSize: '2em' }} title="Improving">
                          ↗️
                        </span>
                      ) : (
                        <span style={{ color: 'red', fontSize: '2em' }} title="Declining">
                          ↘️
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="progress mb-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${performance.score}%` }}
                    ></div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => window.open(performance.pdfUrl, '_blank')}
                  >
                    Download Full Report
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 h-100">
                <Card.Header><h5 className="mb-0" style={{ color: '#1e0a3c' }}>Fee Summary</h5></Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Total Collected</span>
                      <strong>KES {(adminData.totalRevenue * 0.85).toLocaleString()}</strong>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Outstanding</span>
                      <strong className="text-warning">KES {(adminData.totalRevenue * 0.15).toLocaleString()}</strong>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Collection Rate</span>
                      <strong className="text-success">85%</strong>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

              {/* System Alerts - Commented out for now
              <Card className="mb-4">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0" style={{ color: '#1e0a3c' }}>System Alerts</h5>
                    <span className="badge bg-warning">{adminData.systemAlerts}</span>
                  </div>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Low attendance in Class 7 Pearl</span>
                      <span className="badge bg-warning">Alert</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Fee deadline approaching (Sept 25)</span>
                      <span className="badge bg-info">Reminder</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Server maintenance scheduled</span>
                      <span className="badge bg-secondary">Info</span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              */}
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminView;
