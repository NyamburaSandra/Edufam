import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';


const ReportsView: React.FC = () => {
  // --- Download Handlers ---
  // Feedback PDF
  const handleDownloadFeedbackPDF = () => {
    const feedbacks = JSON.parse(localStorage.getItem('edufam_feedbacks') || '[]');
    const doc = new jsPDF();
    doc.text('Parent Feedback Reports', 14, 16);
    autoTable(doc, {
      head: [['From', 'Class', 'Concern Type', 'Message', 'Requested Callback']],
      body: feedbacks.map((fb: any) => [
        fb.from,
        fb.class,
        fb.concernType,
        fb.message,
        fb.requestCallback ? 'Yes' : 'No',
      ]),
      startY: 20,
    });
    doc.save('parent_feedback_reports.pdf');
  };

  // Users Excel
  const handleDownloadUsersExcel = () => {
    const users = JSON.parse(localStorage.getItem('edufam_users') || '[]');
    const ws = XLSX.utils.json_to_sheet(users.map((u: any) => ({
      ID: u.id,
      Name: u.name,
      Type: u.type,
      Class: u.class || '',
      Email: u.email || '',
      StudentID: u.studentId || '',
      Subject: u.subject || '',
      Children: u.children ? u.children.join(', ') : '',
      Phone: u.phoneNumber || '',
      DateAdded: u.dateAdded || '',
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'all_users.xlsx');
  };

  // Events PDF
  const handleDownloadEventsPDF = () => {
    const events = JSON.parse(localStorage.getItem('edufam_events') || '[]');
    const doc = new jsPDF();
    doc.text('Events Reports', 14, 16);
    autoTable(doc, {
      head: [['Title', 'Start Date', 'End Date', 'Description']],
      body: events.map((ev: any) => [
        ev.title,
        ev.start ? new Date(ev.start).toLocaleDateString() : '',
        ev.end ? new Date(ev.end).toLocaleDateString() : '',
        ev.description || '',
      ]),
      startY: 20,
    });
    doc.save('events_report.pdf');
  };

  // Class Performance Excel (placeholder)
  const handleDownloadClassPerfExcel = () => {
    // Placeholder: Replace with real data when available
    const ws = XLSX.utils.aoa_to_sheet([
      ['Class', 'Subject', 'Average Score'],
      ['Class 1', 'Mathematics', 'N/A'],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Class Performance');
    XLSX.writeFile(wb, 'class_performance.xlsx');
  };

  // Attendance Excel (placeholder)
  const handleDownloadAttendanceExcel = () => {
    // Placeholder: Replace with real data when available
    const ws = XLSX.utils.aoa_to_sheet([
      ['Student', 'Class', 'Days Present', 'Days Absent'],
      ['John Doe', 'Class 1', 'N/A', 'N/A'],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance_report.xlsx');
  };

  // Fees Excel (placeholder)
  const handleDownloadFeesExcel = () => {
    // Placeholder: Replace with real data when available
    const ws = XLSX.utils.aoa_to_sheet([
      ['Student', 'Class', 'Fee Balance'],
      ['Jane Doe', 'Class 2', 'N/A'],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fees');
    XLSX.writeFile(wb, 'fees_report.xlsx');
  };

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
              <Button variant="outline-primary" className="mb-2" onClick={handleDownloadFeedbackPDF}>
                <BsFiletypePdf className="me-2" />Download PDF
              </Button>
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
              <Button variant="outline-success" className="mb-2" onClick={handleDownloadUsersExcel}>
                <BsFiletypeXlsx className="me-2" />Download Excel
              </Button>
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
              <Button variant="outline-success" className="mb-2" onClick={handleDownloadClassPerfExcel}>
                <BsFiletypeXlsx className="me-2" />Download Excel
              </Button>
              <ListGroup className="mb-4">
                <ListGroup.Item>Class performance data coming soon.</ListGroup.Item>
              </ListGroup>
              <h6>Events Reports</h6>
              <Button variant="outline-primary" className="mb-2" onClick={handleDownloadEventsPDF}>
                <BsFiletypePdf className="me-2" />Download PDF
              </Button>
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
              <Button variant="outline-success" className="mb-2" onClick={handleDownloadAttendanceExcel}>
                <BsFiletypeXlsx className="me-2" />Download Excel
              </Button>
              <ListGroup className="mb-4">
                <ListGroup.Item>Attendance data coming soon.</ListGroup.Item>
              </ListGroup>
              <h6>Fees Overall Report (Students with Fee Balance)</h6>
              <Button variant="outline-success" className="mb-2" onClick={handleDownloadFeesExcel}>
                <BsFiletypeXlsx className="me-2" />Download Excel
              </Button>
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
