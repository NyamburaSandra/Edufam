import React from 'react';
import { Button } from 'react-bootstrap';
import { useEvents } from '../../context/useEvents';
import { useResults } from '../../context/ResultsContextHook';
import { useAttendance } from '../../context/AttendanceContextHook';

interface TeacherViewProps {
	selectedClass?: string;
	summaryType?: 'results' | 'events' | 'attendance';
}

const TeacherView: React.FC<TeacherViewProps> = ({ selectedClass = '', summaryType = 'results' }) => {
	const { events } = useEvents();
	const { results } = useResults();
	const { attendance } = useAttendance();

	// Helper to normalize class names for comparison
	const normalizeClass = (cls: string) => cls.replace(/class\s*/i, '').trim();

	// Action handlers (implement logic as needed)
	const handleEdit = (type: 'results' | 'events' | 'attendance', idx: number) => {
		alert(`Edit ${type} row #${idx + 1}`);
	};
	const handleDelete = (type: 'results' | 'events' | 'attendance', idx: number) => {
		if (window.confirm('Are you sure you want to delete this entry?')) {
			alert(`Delete ${type} row #${idx + 1}`);
		}
	};

	const tableStyle = {
		borderRadius: 10,
		overflow: 'hidden',
		boxShadow: '0 2px 8px rgba(30,10,60,0.07)'
	};

	const thStyle: React.CSSProperties = {
		background: '#6c63ff',
		color: '#fff',
		fontWeight: 600,
		border: 'none',
		letterSpacing: '0.03em',
		textAlign: 'center' as const,
		verticalAlign: 'middle' as const,
		fontSize: '1.05em'
	};

	return (
		<div className="row dashboard-tab-section" style={{ minHeight: '68vh', minWidth: '', marginTop: '8px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', paddingTop: 12 }}>
			<div className="row">
				{summaryType === "results" && (
					<div className="col-md-10 mx-auto">
						<h3>Results Summary{selectedClass ? ` -  Class ${selectedClass}` : ''}</h3>
						<div style={tableStyle}>
							<table className="table table-hover align-middle mb-0">
							<thead>
								<tr>
									<th style={thStyle}>Student ID</th>
									<th style={thStyle}>Student Name</th>
									<th style={thStyle}>Grade</th>
									<th style={thStyle}>Term</th>
									<th style={thStyle}>File</th>
									<th style={thStyle}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{(selectedClass
									? results.filter(r => normalizeClass(r.studentClass || '') === normalizeClass(selectedClass))
									: results
								).length === 0 ? (
									<tr><td colSpan={6} className="text-center">No results uploaded</td></tr>
								) : (
									(selectedClass
										? results.filter(r => normalizeClass(r.studentClass || '') === normalizeClass(selectedClass))
										: results
									).map((r, idx) => (
										<tr key={idx}>
											<td>{r.studentId}</td>
											<td>{r.studentName}</td>
											<td>{r.grade}</td>
											<td>{r.term}</td>
											<td>{r.fileName ? <a href={r.fileDataUrl} target="_blank" rel="noopener noreferrer">{r.fileName}</a> : '—'}</td>
											<td>
												<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
													<Button
														variant="outline-warning"
														size="sm"
														style={{
															// borderRadius: '50%',
															padding: '0.4em 0.5em',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															boxShadow: '0 1px 4px #ffc10733',
															background: 'transparent',
															borderColor: '#ffc107',
															transition: 'background 0.2s'
														}}
														onMouseOver={e => (e.currentTarget.style.background = '#fffbe6')}
														onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
														onClick={() => handleEdit('results', idx)}
														title="Edit"
													>
														<i className="bi bi-pencil-square" style={{ fontSize: '1.2em', color: '#ffc107', fontWeight: 800, textShadow: '0 1px 2px #fffbe6' }}></i>
													</Button>
													<Button
														variant="outline-danger"
														size="sm"
														style={{
															// borderRadius: '50%',
															padding: '0.4em 0.5em',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															boxShadow: '0 1px 4px #dc354522',
															background: 'transparent',
															// borderColor: '#dc3545',
															transition: 'background 0.2s'
														}}
														onMouseOver={e => {
															e.currentTarget.style.background = '#ffeaea';
															const icon = e.currentTarget.querySelector('i');
															if (icon) icon.style.color = '#b71c1c';
														}}
														onMouseOut={e => {
															e.currentTarget.style.background = 'transparent';
															const icon = e.currentTarget.querySelector('i');
															if (icon) icon.style.color = '#dc3545';
														}}
														onClick={() => handleDelete('results', idx)}
														title="Delete"
													>
														<i className="bi bi-trash" style={{ fontSize: '1.2em', color: '#dc3545', fontWeight: 800, textShadow: '0 1px 2px #ffeaea', transition: 'color 0.2s' }}></i>
													</Button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						</div>
					</div>
				)}
				{summaryType === "events" && (
					<div className="col-md-10 mx-auto">
						<h3>Events Summary - Class {selectedClass}</h3>
						<div style={tableStyle}>
						<table className="table table-hover align-middle mb-0">
							<thead>
								<tr>
									<th style={thStyle}>Event Name</th>
									<th style={thStyle}>Date</th>
									<th style={thStyle}>Start Time</th>
									<th style={thStyle}>End Time</th>
									<th style={thStyle}>Description</th>
									<th style={thStyle}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{events.length === 0 ? (
									<tr><td colSpan={6} className="text-center">No events uploaded</td></tr>
								) : (
									events.map((ev, idx) => (
										<tr key={idx}>
											<td>{ev.title}</td>
											<td>{ev.start ? new Date(ev.start).toLocaleDateString() : ''}</td>
											<td>{ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
											<td>{ev.end ? new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
											<td>{ev.description}</td>
											<td>
												<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
													<Button
														variant="outline-warning"
														size="sm"
														style={{
															borderRadius: '50%',
															padding: '0.4em 0.5em',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															boxShadow: '0 1px 4px #ffc10733',
															background: 'transparent',
															borderColor: '#ffc107',
															transition: 'background 0.2s'
														}}
														onMouseOver={e => (e.currentTarget.style.background = '#fffbe6')}
														onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
														onClick={() => handleEdit('events', idx)}
														title="Edit"
													>
														<i className="bi bi-pencil-square" style={{ fontSize: '1.1em', color: '#ffc107' }}></i>
													</Button>
													<Button variant="outline-danger" size="sm" style={{ borderRadius: '50%', padding: '0.4em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px #dc354522' }} onClick={() => handleDelete('events', idx)} title="Delete">
														<i className="bi bi-trash" style={{ fontSize: '1.1em', color: '#dc3545' }}></i>
													</Button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						</div>
					</div>
				)}
				{summaryType === "attendance" && (
					<div className="col-md-10 mx-auto">
						<h3>Attendance Summary - Class {selectedClass}</h3>
						<div style={tableStyle}>
						<table className="table table-hover align-middle mb-0">
							<thead>
								<tr>
									<th style={thStyle}>Student ID</th>
									<th style={thStyle}>Student Name</th>
									<th style={thStyle}>Term</th>
									<th style={thStyle}>Attendance (%)</th>
									<th style={thStyle}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{(() => {
									const filteredAttendance = selectedClass
										? attendance.filter(a => normalizeClass(a.studentClass || '') === normalizeClass(selectedClass))
										: attendance;
									if (filteredAttendance.length === 0) {
										return <tr><td colSpan={5} className="text-center">No attendance uploaded</td></tr>;
									}
									return filteredAttendance.map((a, idx) => (
										<tr key={idx}>
											<td>{a.studentId}</td>
											<td>{a.studentName}</td>
											<td>{a.term}</td>
											<td>{a.attendancePercent}%</td>
											<td>
												<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
													<Button
														variant="outline-warning"
														size="sm"
														style={{
															borderRadius: '50%',
															padding: '0.4em 0.5em',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															boxShadow: '0 1px 4px #ffc10733',
															background: 'transparent',
															borderColor: '#ffc107',
															transition: 'background 0.2s'
														}}
														onMouseOver={e => (e.currentTarget.style.background = '#fffbe6')}
														onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
														onClick={() => handleEdit('attendance', idx)}
														title="Edit"
													>
														<i className="bi bi-pencil-square" style={{ fontSize: '1.1em', color: '#ffc107' }}></i>
													</Button>
													<Button variant="outline-danger" size="sm" style={{ borderRadius: '50%', padding: '0.4em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px #dc354522' }} onClick={() => handleDelete('attendance', idx)} title="Delete">
														<i className="bi bi-trash" style={{ fontSize: '1.1em', color: '#dc3545' }}></i>
													</Button>
												</div>
											</td>
										</tr>
									));
								})()}
							</tbody>
						</table>
						</div>
					</div>
				)}

								</div>
							
						</div>
			);
};

export default TeacherView;
