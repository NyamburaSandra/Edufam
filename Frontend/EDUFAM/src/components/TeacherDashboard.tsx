import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup, Tab } from 'react-bootstrap';

const TeacherDashboard: React.FC = () => {
		const [activeKey, setActiveKey] = useState('dashboard');

	return (
			<Container fluid className="my-4">
				<Row className="teacher-dashboard-row">
				<Col md={3} className="bg-light p-0">
											<ListGroup variant="flush" className="sidebar">
												<ListGroup.Item action active={activeKey === 'dashboard'} onClick={() => setActiveKey('dashboard')}>
													<i className="bi bi-speedometer2 me-2"></i> Dashboard
												</ListGroup.Item>
												<ListGroup.Item action active={activeKey === 'results'} onClick={() => setActiveKey('results')}>
													<i className="bi bi-file-earmark-bar-graph me-2"></i> Results
												</ListGroup.Item>
												<ListGroup.Item action active={activeKey === 'events'} onClick={() => setActiveKey('events')}>
													<i className="bi bi-calendar-event me-2"></i> Events
												</ListGroup.Item>
												<ListGroup.Item action active={activeKey === 'attendance'} onClick={() => setActiveKey('attendance')}>
													<i className="bi bi-check2-square me-2"></i> Attendance
												</ListGroup.Item>
												<ListGroup.Item action active={activeKey === 'fees'} onClick={() => setActiveKey('fees')}>
													<i className="bi bi-cash-stack me-2"></i> Fees
												</ListGroup.Item>
											</ListGroup>
				</Col>
			<Col md={9} className="p-4 teacher-dashboard-section">
								<Tab.Content>
									<Tab.Pane eventKey="dashboard" active={activeKey === 'dashboard'}>
										<h3>Dashboard Summary</h3>
										<div>
											<h5>Results</h5>
											<p>Latest results uploaded: <strong>None</strong></p>
											<p>Stream performance summary: <strong>None</strong></p>
											<hr />
											<h5>Events</h5>
											<p>Upcoming event: <strong>None</strong></p>
											<hr />
											<h5>Attendance</h5>
											<p>Last attendance marked: <strong>None</strong></p>
											<hr />
											<h5>Fees</h5>
											<p>Fee status summary: <strong>None</strong></p>
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="results" active={activeKey === 'results'}>
										<h3>Upload Results</h3>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Class/Stream</Form.Label>
												<Form.Control type="text" placeholder="Enter class or stream" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Student Results (CSV or Excel)</Form.Label>
												<Form.Control type="file" />
											</Form.Group>
											<Button variant="primary">Upload Results</Button>
										</Form>
										<hr />
										<h4>Stream Performance</h4>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Stream</Form.Label>
												<Form.Control type="text" placeholder="Enter stream" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Performance Summary</Form.Label>
												<Form.Control as="textarea" rows={3} />
											</Form.Group>
											<Button variant="success">Submit Performance</Button>
										</Form>
									</Tab.Pane>
									<Tab.Pane eventKey="events" active={activeKey === 'events'}>
										<h3>Add School Event</h3>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Event Name</Form.Label>
												<Form.Control type="text" placeholder="Enter event name" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Date</Form.Label>
												<Form.Control type="date" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Target</Form.Label>
												<Form.Select>
													<option value="class">Class</option>
													<option value="stream">Stream</option>
													<option value="school">Whole School</option>
												</Form.Select>
											</Form.Group>
											<Button variant="primary">Add Event</Button>
										</Form>
									</Tab.Pane>
									<Tab.Pane eventKey="attendance" active={activeKey === 'attendance'}>
										<h3>Attendance</h3>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Date</Form.Label>
												<Form.Control type="date" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Class/Stream</Form.Label>
												<Form.Control type="text" placeholder="Enter class or stream" />
											</Form.Group>
											<Button variant="primary">Mark/View Attendance</Button>
										</Form>
									</Tab.Pane>
									<Tab.Pane eventKey="fees" active={activeKey === 'fees'}>
										<h3>Fees</h3>
										<Form>
											<Form.Group className="mb-3">
												<Form.Label>Student Name</Form.Label>
												<Form.Control type="text" placeholder="Enter student name" />
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Fee Status</Form.Label>
												<Form.Select>
													<option value="paid">Paid</option>
													<option value="pending">Pending</option>
													<option value="notyet">Not Yet Paid</option>
												</Form.Select>
											</Form.Group>
											<Button variant="success">Approve Payment</Button>
										</Form>
									</Tab.Pane>
								</Tab.Content>
				</Col>
			</Row>
		</Container>
	);
};

export default TeacherDashboard;
