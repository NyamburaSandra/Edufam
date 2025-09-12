import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, ListGroup } from 'react-bootstrap';


interface Grade {
  subject: string;
  grade: string;
}

interface Notification {
  id: number;
  message: string;
  date: string;
  event: string;
  description: string;
  extra: string;
  start: string;
  end: string;
  photo: string;
}

const ParentDashboard: React.FC = () => {
  const childData = {
    name: "Collins Mwasi",
    class: "Grade 5-A",
    photo: "https://randomuser.me/api/portraits/men/32.jpg", // working online image
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

  // Helper to get days in current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarEvents = [
    { id: 1, title: "Mid-term Exams", date: "2025-09-15", type: "exam" },
    { id: 2, title: "Parent-Teacher Meeting", date: "2025-09-20", type: "meeting" },
    { id: 3, title: "School Holiday", date: "2025-09-25", type: "holiday" }
  ];

  return (
    <Container className="py-4">
      {/* Top row: Child Profile and Fees side by side */}
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            {/* Child Profile */}
            <Card.Header>
              <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700 }}>Child Profile</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <img
                    src={childData.photo}
                    alt={childData.name}
                    className="rounded-circle mb-3"
                    style={{ width: "120px", height: "120px", objectFit: "cover", border: '3px solid #1e0a3c', background: '#fff' }}
                  />
                  <h4>{childData.name}</h4>
                  <p className="text-muted">{childData.class}</p>
                  {/* Restore chat buttons */}
                  <div className="d-flex flex-column gap-2 mt-3">
                    <Button className="modern-action-btn" style={{ width: '100%' }}>
                      <i className="bi bi-chat-dots me-2"></i> Chat with Teacher
                    </Button>
                    <Button className="modern-action-btn" style={{ width: '100%' }}>
                      <i className="bi bi-people me-2"></i> Group Chat
                    </Button>
                  </div>
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
                        <Badge className="custom-grade-badge">{grade.grade}</Badge>
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
        </Col>
        <Col md={4}>
          <Card className="mb-4 fee-status-card">
            {/* Fee Status */}
            <Card.Header>
              <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700 }}>Fee Status</h5>
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
                <Button
                  variant="primary"
                  className="modern-action-btn"
                  style={{
                    width: '100%',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #6c63ff 0%, #1e0a3c 100%)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #1e0a3c 0%, #6c63ff 100%)')}
                >
                  Pay Now
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifications section */}
      <Row>
        <Col md={12} style={{ padding: 0 }}>
          <Card className="mb-4" style={{ margin: 0 }}>
            {/* Recent Notifications */}
            <Card.Header>
              <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700 }}>Recent Notifications</h5>
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
                    className="mt-2 mt-md-0 modern-action-btn"
                    style={{
                      // background and color handled by class
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

      {/* School Calendar section */}
      <Row>
        <Col md={12}>
          <Card className="mb-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', border: 'none', boxShadow: '0 4px 24px rgba(108,99,255,0.10)' }}>
            {/* School Calendar */}
            <Card.Header style={{ background: 'transparent', border: 'none', paddingBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700, letterSpacing: 0.5 }}>School Calendar</h5>
              <span style={{ fontWeight: 500, color: '#6c63ff', fontSize: '1.08em', background: '#f3f7ff', borderRadius: 8, padding: '4px 14px', marginLeft: 12 }}>
                {now.toLocaleString('default', { month: 'long' })} {year}
              </span>
            </Card.Header>
            <Card.Body>
              {/* Calendar grid for current month */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '0.7rem',
                marginBottom: '1.5rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(108,99,255,0.07)',
                padding: '1.2rem 0.7rem'
              }}>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const event = calendarEvents.find(e => Number(e.date.split('-')[2]) === day && Number(e.date.split('-')[1]) === month + 1 && Number(e.date.split('-')[0]) === year);
                  let eventColor = '#fff';
                  let eventText = '#1e0a3c';
                  let badgeBg = '#6c63ff';
                  if (event) {
                    if (event.type === 'exam') {
                      eventColor = 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)';
                      eventText = '#b80000';
                      badgeBg = '#ff6b6b';
                    } else if (event.type === 'meeting') {
                      eventColor = 'linear-gradient(90deg, #c9ffbf 0%, #ffafbd 100%)';
                      eventText = '#185a9d';
                      badgeBg = '#43cea2';
                    } else if (event.type === 'holiday') {
                      eventColor = 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)';
                      eventText = '#6c63ff';
                      badgeBg = '#6c63ff';
                    }
                  }
                  return (
                    <div
                      key={day}
                      style={{
                        border: 'none',
                        borderRadius: 14,
                        minHeight: 70,
                        background: event ? eventColor : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                        color: event ? eventText : '#333',
                        boxShadow: event ? '0 4px 16px rgba(108,99,255,0.10)' : '0 1px 3px rgba(30,10,60,0.04)',
                        position: 'relative',
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        cursor: event ? 'pointer' : 'default',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.04)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,99,255,0.18)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = event ? '0 4px 16px rgba(108,99,255,0.10)' : '0 1px 3px rgba(30,10,60,0.04)';
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '1.1em', opacity: 0.85 }}>{day}</span>
                      {event && (
                        <div style={{ fontSize: '0.93em', marginTop: 4, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                          <span>{event.title}</span>
                          <span style={{
                            background: badgeBg,
                            color: '#fff',
                            borderRadius: 8,
                            fontSize: '0.78em',
                            fontWeight: 700,
                            marginLeft: 8,
                            padding: '2px 8px',
                            letterSpacing: 0.2,
                            boxShadow: '0 1px 4px rgba(30,10,60,0.10)'
                          }}>{event.type}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feedback section */}
      <Row>
        <Col md={12}>
          <Card className="mb-4 feedback-card-gradient" style={{ background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', border: 'none', boxShadow: '0 4px 24px rgba(171,71,188,0.10)' }}>
            {/* Feedback / Request Meeting */}
            <Card.Header style={{ background: 'transparent', border: 'none', paddingBottom: 0 }}>
              <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700, letterSpacing: 0.5 }}>Feedback / Request Meeting</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => { e.preventDefault(); }}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#a83279', fontWeight: 600 }}>Concern Type</Form.Label>
                  <Form.Select style={{ background: '#fff', border: '1.5px solid #a83279', borderRadius: 10, color: '#6c63ff', fontWeight: 500 }}>
                    <option value="">Select concern type...</option>
                    <option value="academic">Academic</option>
                    <option value="behavior">Behavior</option>
                    <option value="health">Health</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#a83279', fontWeight: 600 }}>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} style={{ background: '#fff', border: '1.5px solid #a83279', borderRadius: 10, color: '#6c63ff', fontWeight: 500 }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Request Callback" style={{ color: '#a83279', fontWeight: 500 }} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{
                  background: 'linear-gradient(90deg, #a83279 0%, #6c63ff 100%)',
                  border: 'none',
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  letterSpacing: 0.5,
                  padding: '0.6rem 1.4rem',
                  boxShadow: '0 2px 8px rgba(171,71,188,0.10)',
                  color: '#fff',
                  transition: 'all 0.2s',
                }}>
                  Submit Feedback
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParentDashboard;