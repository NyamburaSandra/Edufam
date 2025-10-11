import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const ReportsView: React.FC = () => {
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>
              <h3><i className="bi bi-file-earmark-text me-2"></i>School Reports</h3>
            </Card.Header>
            <Card.Body>
              <h6>Parent Feedback Reports</h6>
              <Button variant="outline-primary" className="mb-2">Download PDF</Button>
              <ListGroup className="mb-4">
                {(() => {
                  const feedbacks = JSON.parse(localStorage.getItem('edufam_feedbacks') || '[]');
                  if (!feedbacks.length) return <ListGroup.Item>No feedback yet.</ListGroup.Item>;
                  type Feedback = {
                    from: string;
                    class: string;
                    concernType: string;
                    message: string;
                    requestCallback: boolean;
                  };
                  return feedbacks.map((fb: Feedback, idx: number) => (
                    <ListGroup.Item key={idx}>
                      <strong>{fb.from}</strong> ({fb.class}) - {fb.concernType}<br />
                      {fb.message}
                      {fb.requestCallback && <span style={{ color: '#a83279', fontWeight: 500 }}> Requested Callback</span>}
                    </ListGroup.Item>
                  ));
                })()}
              </ListGroup>
              <h6>All Teachers, Students, Parents</h6>
              <Button variant="outline-primary" className="mb-2">Download PDF</Button>
              <ListGroup className="mb-4">
                {(() => {
                  const users = JSON.parse(localStorage.getItem('edufam_users') || '[]');
                  if (!users.length) return <ListGroup.Item>No users yet.</ListGroup.Item>;
                  type User = {
                    id: string | number;
                    name: string;
                    type: string;
                    class?: string;
                  };
                  return users.map((u: User) => (
                    <ListGroup.Item key={u.id}>
                      <strong>{u.name}</strong> <span className="text-muted">({u.type})</span> {u.class && <span>- Class: {u.class}</span>}
                    </ListGroup.Item>
                  ));
                })()}
              </ListGroup>
              <h6>Class Performance Reports (Uploaded by Teachers)</h6>
              <Button variant="outline-primary" className="mb-2">Download PDF</Button>
              <ListGroup className="mb-4">
                <ListGroup.Item>Class performance data coming soon.</ListGroup.Item>
              </ListGroup>
              <h6>Events Reports</h6>
              <Button
                variant="outline-primary"
                className="mb-2"
                onClick={() => {
                  const events = JSON.parse(localStorage.getItem('edufam_events') || '[]');
                  if (!events.length) {
                    alert('No events to download.');
                    return;
                  }
                  const header = ['Event Name', 'Date', 'Start Time', 'End Time', 'Description'];
                  type Event = {
                    title: string;
                    start?: string;
                    end?: string;
                    description?: string;
                  };
                  const eventRows = (events as Event[]).map((ev) => [
                    ev.title,
                    ev.start ? new Date(ev.start).toLocaleDateString() : '',
                    ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                    ev.end ? new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                    ev.description || ''
                  ]);
                  const win = window.open('', '_blank');
                  if (win) {
                    win.document.write('<html><head><title>Event Reports PDF</title></head><body>');
                    win.document.write('<h2>Event Reports</h2>');
                    win.document.write('<table border="1" cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:1rem;">');
                    win.document.write('<tr>' + header.map((h: string) => `<th>${h}</th>`).join('') + '</tr>');
                    eventRows.forEach((row: string[]) => {
                      win.document.write('<tr>' + row.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>');
                    });
                    win.document.write('</table>');
                    win.document.write('</body></html>');
                    win.document.close();
                    win.print();
                  } else {
                    alert('Unable to open PDF window. Please check your browser settings.');
                  }
                }}
              >Download PDF</Button>
              <ListGroup className="mb-4">
                {(() => {
                  const events = JSON.parse(localStorage.getItem('edufam_events') || '[]');
                  if (!events.length) return <ListGroup.Item>No events yet.</ListGroup.Item>;
                  type Event = {
                    title: string;
                    start?: string;
                    end?: string;
                    description?: string;
                  };
                  return (events as Event[]).map((ev, idx: number) => (
                    <ListGroup.Item key={idx}>
                      <strong>{ev.title}</strong> <span className="text-muted">({ev.start ? new Date(ev.start).toLocaleDateString() : 'No date'})</span><br />
                      {ev.description}
                    </ListGroup.Item>
                  ));
                })()}
              </ListGroup>
              <h6>Attendance Reports (Filter by Student)</h6>
              <Button variant="outline-primary" className="mb-2">Download PDF</Button>
              <ListGroup className="mb-4">
                <ListGroup.Item>Attendance data coming soon.</ListGroup.Item>
              </ListGroup>
              <h6>Fees Overall Report (Students with Fee Balance)</h6>
              <Button variant="outline-primary" className="mb-2">Download PDF</Button>
              <ListGroup className="mb-4">
                <ListGroup.Item>Fees data coming soon.</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsView;
