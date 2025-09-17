import React, { useState } from 'react';
import { useEvents } from '../context/useEvents';
import { Container, Row, Col, Button, Form, ListGroup, Tab } from 'react-bootstrap';

const TeacherDashboard: React.FC = () => {
	const [activeKey, setActiveKey] = useState('dashboard');
	const [selectedSummaryClass, setSelectedSummaryClass] = useState("");
	const { addEvent } = useEvents();

	// State for event form
	const [eventForm, setEventForm] = useState({
		title: '',
		date: '',
		time: '',
		description: '',
	});

	const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setEventForm({ ...eventForm, [e.target.name]: e.target.value });
	};

	const handleAddEvent = (e: React.FormEvent) => {
		e.preventDefault();
		if (!eventForm.title || !eventForm.date || !eventForm.time) return;
		const [hour, minute] = eventForm.time.split(':').map(Number);
		const start = new Date(eventForm.date);
		start.setHours(hour, minute, 0, 0);
		const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
		addEvent({
			title: eventForm.title,
			start,
			end,
			description: eventForm.description,
		});
		setEventForm({ title: '', date: '', time: '', description: '' });
		alert('Event added! It will appear in the Parent Dashboard.');
	};

	return (
		<>
			<Container fluid className="my-4" >
				<Row className="teacher-dashboard-row g-0">
					<Col md={3} className="p-0">
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
						</ListGroup>
					</Col>
					<Col md={9} className="p-4 teacher-dashboard-section">
						<div style={{ marginTop: '40px' }}>
							<Tab.Content>
								<Tab.Pane eventKey="dashboard" active={activeKey === 'dashboard'}>
									<div className="row dashboard-tab-section">
										<div className="col-md-12 mb-4">
											<Form.Group>
												<Form.Label>Choose Class to View Summary</Form.Label>
												<Form.Select value={selectedSummaryClass} onChange={e => setSelectedSummaryClass(e.target.value)} style={{ maxWidth: 300 }}>
													<option value="">Select class...</option>
													<option value="1 Ivory">Class 1 Ivory</option>
													<option value="1 Pearl">Class 1 Pearl</option>
													<option value="2 Ivory">Class 2 Ivory</option>
													<option value="2 Pearl">Class 2 Pearl</option>
													<option value="3 Ivory">Class 3 Ivory</option>
													<option value="3 Pearl">Class 3 Pearl</option>
													<option value="4 Ivory">Class 4 Ivory</option>
													<option value="4 Pearl">Class 4 Pearl</option>
													<option value="5 Ivory">Class 5 Ivory</option>
													<option value="5 Pearl">Class 5 Pearl</option>
													<option value="6 Ivory">Class 6 Ivory</option>
													<option value="6 Pearl">Class 6 Pearl</option>
													<option value="7 Ivory">Class 7 Ivory</option>
													<option value="7 Pearl">Class 7 Pearl</option>
													<option value="8 Ivory">Class 8 Ivory</option>
													<option value="8 Pearl">Class 8 Pearl</option>
												</Form.Select>
											</Form.Group>
										</div>
										{selectedSummaryClass && (
											<>
												<div className="col-md-6">
													<h3>Results Summary - {selectedSummaryClass}</h3>
													<table className="table table-bordered">
														<thead>
															<tr>
																<th>Student ID</th>
																<th>Student Name</th>
																<th>Latest Results</th>
															</tr>
														</thead>
														<tbody>
															{/* Example row, replace with real data */}
															<tr>
																<td>12A</td>
																<td>Jane Doe</td>
																<td>A</td>
															</tr>
														</tbody>
													</table>
													<h3>Events Summary</h3>
													<table className="table table-bordered">
														<thead>
															<tr>
																<th>Event Name</th>
																<th>Date</th>
																<th>Description</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>None</td>
																<td>None</td>
																<td>None</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div className="col-md-6">
													<h3>Attendance Summary - {selectedSummaryClass}</h3>
													<table className="table table-bordered">
														<thead>
															<tr>
																<th>Student ID</th>
																<th>Student Name</th>
																<th>Attendance (%)</th>
															</tr>
														</thead>
														<tbody>
															{/* Example row, replace with real data */}
															<tr>
																<td>12A</td>
																<td>Jane Doe</td>
																<td>98%</td>
															</tr>
														</tbody>
													</table>
												</div>
											</>
										)}
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey="results" active={activeKey === 'results'}>
									<h3>Upload Results</h3>
									<Form>
										<Form.Group className="mb-3">
											<Form.Label>Class/Stream</Form.Label>
											<Form.Select>
												<option value="">Select class...</option>
												<option value="1 Ivory">Class 1 Ivory</option>
												<option value="1 Pearl">Class 1 Pearl</option>
												<option value="2 Ivory">Class 2 Ivory</option>
												<option value="2 Pearl">Class 2 Pearl</option>
												<option value="3 Ivory">Class 3 Ivory</option>
												<option value="3 Pearl">Class 3 Pearl</option>
												<option value="4 Ivory">Class 4 Ivory</option>
												<option value="4 Pearl">Class 4 Pearl</option>
												<option value="5 Ivory">Class 5 Ivory</option>
												<option value="5 Pearl">Class 5 Pearl</option>
												<option value="6 Ivory">Class 6 Ivory</option>
												<option value="6 Pearl">Class 6 Pearl</option>
												<option value="7 Ivory">Class 7 Ivory</option>
												<option value="7 Pearl">Class 7 Pearl</option>
												<option value="8 Ivory">Class 8 Ivory</option>
												<option value="8 Pearl">Class 8 Pearl</option>
											</Form.Select>
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Student Results (CSV or Excel)</Form.Label>
											<Form.Control type="file" />
										</Form.Group>
										<Button variant="primary">Upload Results</Button>
									</Form>
								</Tab.Pane>
												<Tab.Pane eventKey="events" active={activeKey === 'events'}>
													<h3>Add School Event</h3>
													<Form onSubmit={handleAddEvent}>
														<Form.Group className="mb-3">
															<Form.Label>Event Name</Form.Label>
															<Form.Control
																type="text"
																placeholder="Enter event name"
																name="title"
																value={eventForm.title}
																onChange={handleEventFormChange}
																required
															/>
														</Form.Group>
														<Form.Group className="mb-3">
															<Form.Label>Date</Form.Label>
															<Form.Control
																type="date"
																name="date"
																value={eventForm.date}
																onChange={handleEventFormChange}
																required
															/>
														</Form.Group>
														<Form.Group className="mb-3">
															<Form.Label>Time</Form.Label>
															<Form.Control
																type="time"
																name="time"
																value={eventForm.time}
																onChange={handleEventFormChange}
																required
															/>
														</Form.Group>
														<Form.Group className="mb-3">
															<Form.Label>Description</Form.Label>
															<Form.Control
																as="textarea"
																rows={2}
																placeholder="Enter event description"
																name="description"
																value={eventForm.description}
																onChange={handleEventFormChange}
															/>
														</Form.Group>
														{/* Event Image upload can be added to backend integration */}
														<Button variant="primary" type="submit">Add Event</Button>
													</Form>
												</Tab.Pane>
								<Tab.Pane eventKey="attendance" active={activeKey === 'attendance'}>
									<h3>Attendance</h3>
									<Form>
										<Form.Group className="mb-3">
											<Form.Label>Student ID</Form.Label>
											<Form.Control type="text" placeholder="Enter student ID (e.g., 12A, 7B)" />
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Student Name</Form.Label>
											<Form.Control type="text" placeholder="Enter student name" />
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Student Class</Form.Label>
											<Form.Select>
												<option value="">Select class...</option>
												<option value="1 Ivory">Class 1 Ivory</option>
												<option value="1 Pearl">Class 1 Pearl</option>
												<option value="2 Ivory">Class 2 Ivory</option>
												<option value="2 Pearl">Class 2 Pearl</option>
												<option value="3 Ivory">Class 3 Ivory</option>
												<option value="3 Pearl">Class 3 Pearl</option>
												<option value="4 Ivory">Class 4 Ivory</option>
												<option value="4 Pearl">Class 4 Pearl</option>
												<option value="5 Ivory">Class 5 Ivory</option>
												<option value="5 Pearl">Class 5 Pearl</option>
												<option value="6 Ivory">Class 6 Ivory</option>
												<option value="6 Pearl">Class 6 Pearl</option>
												<option value="7 Ivory">Class 7 Ivory</option>
												<option value="7 Pearl">Class 7 Pearl</option>
												<option value="8 Ivory">Class 8 Ivory</option>
												<option value="8 Pearl">Class 8 Pearl</option>
											</Form.Select>
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Parent Email</Form.Label>
											<Form.Control type="email" placeholder="Enter parent email" />
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Mark Attendance for 9 Weeks</Form.Label>
											<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
												{[...Array(9)].map((_, i) => (
													<Form.Check key={i} type="checkbox" label={`Week ${i + 1}`} />
												))}
											</div>
										</Form.Group>
										<Button variant="primary">Upload Attendance</Button>
									</Form>
								</Tab.Pane>
							</Tab.Content>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TeacherDashboard;
