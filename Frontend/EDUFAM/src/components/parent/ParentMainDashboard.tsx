import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import AttendancePieChart from '../AttendancePieChart';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface ChildData {
  studentName: string;
  studentId: string;
  studentClass: string;
  term: string;
  fileName?: string;
  fileDataUrl?: string;
  attendance: number;
}

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
}

interface ParentMainDashboardProps {
  childData: ChildData;
  events: Event[];
}

const ParentMainDashboard: React.FC<ParentMainDashboardProps> = ({ childData, events }) => {
  return (
    <>
      {/* Child Profile Section */}
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700 }}>Child Profile</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <h6>Overall Performance</h6>
              <div style={{ color: '#6c63ff', fontWeight: 500, marginBottom: 8 }}>
                {childData.term ? `Term: ${childData.term.replace(/-/g, ' ').replace(/term(\d)/, 'Term $1').replace('midterm', 'Midterm').replace('endterm', 'End Term')}` : 'No results uploaded yet.'}
              </div>
              {childData.fileName && childData.fileDataUrl && (
                <a href={childData.fileDataUrl} download={childData.fileName}>
                  <Button
                    variant="primary"
                    style={{
                      background: 'linear-gradient(90deg, #1e0a3c 0%, #6c63ff 100%)',
                      border: 'none',
                      borderRadius: 20,
                      fontWeight: 700,
                      fontSize: '1.08rem',
                      letterSpacing: 0.5,
                      padding: '0.6rem 1.4rem',
                      boxShadow: '0 2px 8px rgba(30,10,60,0.10)',
                      color: '#fff',
                      transition: 'all 0.2s',
                    }}
                  >
                    Download Results
                  </Button>
                </a>
              )}
            </Col>

            <Col md={4} className="text-center">
              <div className="attendance-circle">
                <h6>Attendance</h6>
                <AttendancePieChart percent={childData.attendance} />
                <div className="percentage">
                  <h3>{childData.attendance}%</h3>
                </div>
              </div>
            </Col>

            <Col md={4} className="text-center">
              <div className="d-flex flex-column gap-2 mt-3">
                <Button className="modern-action-btn" style={{ width: '100%' }}>
                  <i className="bi bi-chat-dots me-2"></i> Chat with Teacher
                </Button>
                <Button className="modern-action-btn" style={{ width: '100%' }}>
                  <i className="bi bi-people me-2"></i> Group Chat
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fees Section */}
      <Card className="mb-4 fee-status-card">
        <Card.Header>
          <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700 }}>Fee Status</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <h6>Total Fee</h6>
              <h4>KES 30,000</h4>
            </Col>
            <Col md={4}>
              <h6>Paid Amount</h6>
              <h4 className="text-success">KES 20,000</h4>
            </Col>
            <Col md={4}>
              <h6>Due Amount</h6>
              <h4 className="text-danger">KES 10,000</h4>
            </Col>
          </Row>
          <div className="mt-3">
            <p>Next payment due: 2025-09-30</p>
            <Button
              variant="primary"
              className="modern-action-btn"
              style={{ width: '100%' }}
            >
              Pay Now
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Events Calendar section */}
      <Card className="mb-4" style={{ background: '#cf84c7', border: 'none', boxShadow: '0px 1px 4px rgba(30,10,60,0.1)' }}>
        <Card.Header style={{ background: 'transparent', border: 'none', paddingBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h5 className="mb-0" style={{ color: '#1e0a3c', fontWeight: 700, letterSpacing: 0.5 }}>Events Calendar</h5>
        </Card.Header>
        <Card.Body>
          <div style={{ height: 500, background: "#fff", borderRadius: "8px", padding: "16px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ParentMainDashboard;
