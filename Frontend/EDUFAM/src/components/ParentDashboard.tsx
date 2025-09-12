import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, ListGroup } from 'react-bootstrap';

type Grade = {
  subject: string;
  grade: string;
};

const ParentDashboard: React.FC = () => {
  const childData = {
    name: "John Doe",
    class: "Grade 5-A",
    photo: "/placeholder-student.jpg",
    recentGrades: [
      { subject: "Mathematics", grade: "A" },
      { subject: "English", grade: "B+" },
      { subject: "Science", grade: "A-" },
      { subject: "Kiswahili", grade: "A-" },
      { subject: "Art", grade: "A-" }
    ] as Grade[],
    attendance: 90
    };

  // Example notifications
  const notifications = [
    {
      id: 1,
      message: "Parent-Teacher Meeting scheduled",
      date: "2025-09-20",
      event: "Parent-Teacher Meeting",
      description: "Join us for a discussion on your child's progress and school updates.",
      extra: "Your presence is highly encouraged to foster better communication.",
      start: "10:00 AM",
      end: "12:00 PM",
      photo: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      message: "Mid-term Exams coming up",
      date: "2025-09-15",
      event: "Mid-term Exams",
      description: "Mid-term exams for all classes. Ensure your child is prepared.",
      extra: "Please check the exam timetable and help your child revise.",
      start: "8:00 AM",
      end: "1:00 PM",
      photo: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      message: "School Holiday announced",
      date: "2025-09-25",
      event: "School Holiday",
      description: "School will be closed for a public holiday. Enjoy your break!",
      extra: "Classes will resume as usual after the holiday.",
      start: "All Day",
      end: "All Day",
      photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
    },
  ];

  const handleConfirmAttendance = (event: string) => {
    alert(`Attendance confirmed for: ${event}`);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={12} style={{ padding: 0 }}>
          <Card className="mb-4" style={{ margin: 0 }}>
            <Card.Header>
              <h5 className="mb-0" style={{ color: '#1e0a3c' }}>Recent Notifications</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {notifications.map((notif) => (
                <ListGroup.Item
                  key={notif.id}
                  className="d-flex flex-column flex-md-row align-items-md-center"
                  style={{ border: 'none', borderBottom: 'none', marginBottom: '1.2rem', background: 'transparent' }}
                >
                  <div style={{ minWidth: 80, marginRight: 20, marginBottom: 10 }}>
                    <img
                      src={notif.photo}
                      alt={notif.event}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 8px rgba(30,10,60,0.08)' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#1e0a3c' }}>{notif.message}</strong>
                    <div className="text-muted" style={{ fontSize: "0.9em" }}>{notif.date}</div>
                    <div style={{ fontSize: "0.95em", margin: "0.25em 0" }}>{notif.description}</div>
                    <div style={{ fontSize: "0.92em", color: '#555', marginBottom: 2 }}>{notif.extra}</div>
                    <div style={{ fontSize: "0.95em" }}>
                      <span className="fw-bold">Time:</span> {notif.start} - {notif.end}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2 mt-md-0"
                    style={{
                      background: 'linear-gradient(90deg, #1e0a3c 0%, #6c63ff 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      padding: '0.4rem 1.2rem',
                      boxShadow: '0 2px 8px rgba(30,10,60,0.08)',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #6c63ff 0%, #1e0a3c 100%)')}
                    onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #1e0a3c 0%, #6c63ff 100%)')}
                    onClick={() => handleConfirmAttendance(notif.event)}
                  >
                    Learn More
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Child Profile</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <img
                    src={childData.photo}
                    alt={childData.name}
                    className="rounded-circle mb-3"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <h4>{childData.name}</h4>
                  <p className="text-muted">{childData.class}</p>
                </Col>
                <Col md={4}>
                  <h6>Recent Grades</h6>
                  <ListGroup variant="flush">
                    {childData.recentGrades.map((grade, index) => (
                      <ListGroup.Item 
                        key={index} 
                        className="d-flex justify-content-between align-items-center"
                      >
                        {grade.subject}
                        <Badge bg="primary">{grade.grade}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={4} className="text-center">
                  <div className="attendance-circle">
                    <h6>Attendance</h6>
                    <div className="percentage">
                      <h3>{childData.attendance}%</h3>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row className="mb-4">
            <Col>
              <Button 
                variant="success" 
                size="lg" 
                className="w-100"
                onClick={() => window.open('https://wa.me/your-whatsapp-number', '_blank')}
              >
                <i className="bi bi-whatsapp me-2"></i>
                Chat with Teacher
              </Button>
            </Col>
            <Col>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={() => window.open('https://wa.me/your-group-invite-link', '_blank')}
              >
                <i className="bi bi-people me-2"></i>
                Parents Group Chat
              </Button>
            </Col>
          </Row>

          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">School Calendar</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {[
                { id: 1, title: "Mid-term Exams", date: "2025-09-15", type: "exam" as const },
                { id: 2, title: "Parent-Teacher Meeting", date: "2025-09-20", type: "meeting" as const },
                { id: 3, title: "School Holiday", date: "2025-09-25", type: "holiday" as const }
              ].map(event => (
                <ListGroup.Item key={event.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{event.title}</h6>
                      <small className="text-muted">{event.date}</small>
                    </div>
                    <Badge bg={
                      event.type === "exam" ? "danger" :
                      event.type === "meeting" ? "info" : "success"
                    }>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Add to Calendar
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Set Reminder
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Fee Status</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h6>Total Fee</h6>
                  <h4>$5000</h4>
                </Col>
                <Col md={4}>
                  <h6>Paid Amount</h6>
                  <h4 className="text-success">$3000</h4>
                </Col>
                <Col md={4}>
                  <h6>Due Amount</h6>
                  <h4 className="text-danger">$2000</h4>
                </Col>
              </Row>
              <div className="mt-3">
                <p>Next payment due: 2025-09-30</p>
                <Button variant="primary">Pay Now</Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Feedback / Request Meeting</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => { e.preventDefault(); }}>
                <Form.Group className="mb-3">
                  <Form.Label>Concern Type</Form.Label>
                  <Form.Select>
                    <option value="">Select concern type...</option>
                    <option value="academic">Academic</option>
                    <option value="behavior">Behavior</option>
                    <option value="health">Health</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Request Callback" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit Feedback</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParentDashboard;