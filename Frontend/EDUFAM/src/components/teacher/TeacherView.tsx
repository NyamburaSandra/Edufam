// Download handler for attendance summary
	const handleDownloadAttendance = (attendance: AttendanceEntry[], type: 'excel' | 'pdf') => {
		const rows = attendance.map((a: AttendanceEntry) => [
			a.studentId || '',
			a.studentName || '',
			a.term || '',
			typeof a.attendancePercent === 'number' ? a.attendancePercent : ''
		]);
		const header = ['Student ID', 'Student Name', 'Term', 'Attendance %'];
		if (type === 'excel') {
			let csv = header.join(',') + '\n';
			csv += rows.map((row: (string | number)[]) => row.map((cell: string | number) => '"' + String(cell).replace(/"/g, '""') + '"').join(',')).join('\n');
			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'attendance_summary.csv';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else {
			const win = window.open('', '_blank');
			if (win) {
				win.document.write('<html><head><title>Attendance Summary PDF</title></head><body>');
				win.document.write('<h2>Attendance Summary</h2>');
				win.document.write('<table border="1" cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:1rem;">');
				win.document.write('<tr>' + header.map((h: string) => `<th>${h}</th>`).join('') + '</tr>');
				rows.forEach((row: (string | number)[]) => {
					win.document.write('<tr>' + row.map((cell: string | number) => `<td>${cell}</td>`).join('') + '</tr>');
				});
				win.document.write('</table>');
				win.document.write('</body></html>');
				win.document.close();
				win.print();
			} else {
				alert('Unable to open PDF window. Please check your browser settings.');
			}
		}
	};

	// Download handler for event summary
	const handleDownload = (events: EventRow[], type: 'excel' | 'pdf') => {
		// Prepare event data
		const eventRows = events.map(ev => [
			ev.title,
			ev.start ? new Date(ev.start).toLocaleDateString() : '',
			ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
			ev.end ? new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
			ev.description
		]);
		const header = ['Event Name', 'Date', 'Start Time', 'End Time', 'Description'];
		if (type === 'excel') {
			// Simple CSV export
			let csv = header.join(',') + '\n';
			csv += eventRows.map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(',')).join('\n');
			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'event_summary.csv';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else {
			// Simple PDF export using window.print (for demo)
			const win = window.open('', '_blank');
			if (win) {
				win.document.write('<html><head><title>Event Summary PDF</title></head><body>');
				win.document.write('<h2>Event Summary</h2>');
				win.document.write('<table border="1" cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:1rem;">');
				win.document.write('<tr>' + header.map(h => `<th>${h}</th>`).join('') + '</tr>');
				eventRows.forEach(row => {
					win.document.write('<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>');
				});
				win.document.write('</table>');
				win.document.write('</body></html>');
				win.document.close();
				win.print();
			} else {
				alert('Unable to open PDF window. Please check your browser settings.');
			}
		}
	};
    
import React from 'react';
import '../../assets/style/Teacher.css';
import { Modal, Button } from 'react-bootstrap';
import { useEvents } from '../../context/useEvents';
import type { EdufamEvent } from '../../context/EventsContext';
import { useResults } from '../../context/ResultsContextHook';
import { useAttendance } from '../../context/AttendanceContextHook';
import type { AttendanceEntry } from '../../context/AttendanceContext';

// Try to import EdufamEvent type from EventsContext, fallback to inline type if not found
// import { EdufamEvent } from '../../context/EventsContext';

type ResultRow = {
	studentId?: string;
	studentName?: string;
	grade?: string;
	term?: string;
	fileDataUrl?: string;
	fileName?: string;
	studentClass?: string;
	[key: string]: unknown;
};

type EventRow = EdufamEvent;

type AttendanceRow = {
	studentId?: string;
	studentName?: string;
	term?: string;
	attendancePercent?: number;
	[key: string]: unknown;
};

type EditRowType = ResultRow | EventRow | AttendanceRow | Record<string, unknown>;

interface TeacherViewProps {
	selectedClass?: string;
	summaryType?: 'results' | 'events' | 'attendance';
}


const TeacherView: React.FC<TeacherViewProps> = ({ selectedClass = '', summaryType = 'results' }) => {
	const { events: contextEvents } = useEvents();
	const { results: contextResults } = useResults();
	const { attendance: contextAttendance } = useAttendance();

	const [results, setResults] = React.useState(contextResults);
	const [events, setEvents] = React.useState(contextEvents);
	const [attendance, setAttendance] = React.useState(contextAttendance);

	React.useEffect(() => { setResults(contextResults); }, [contextResults]);
	React.useEffect(() => { setEvents(contextEvents); }, [contextEvents]);
	React.useEffect(() => { setAttendance(contextAttendance); }, [contextAttendance]);

	// Term filter state
	const [selectedTerm, setSelectedTerm] = React.useState<string>('');

	// Helper to normalize class names for comparison
	const normalizeClass = (cls: string) => cls.replace(/class\s*/i, '').trim();


	// Modal state for edit/delete
	const [showEditModal, setShowEditModal] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);
	const [selectedType, setSelectedType] = React.useState<'results' | 'events' | 'attendance' | null>(null);
	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const handleEdit = (type: 'results' | 'events' | 'attendance', idx: number) => {
		setSelectedType(type);
		setSelectedIndex(idx);
		setShowEditModal(true);
	};
	const handleDelete = (type: 'results' | 'events' | 'attendance', idx: number) => {
		setSelectedType(type);
		setSelectedIndex(idx);
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		if (selectedType && selectedIndex !== null) {
			if (selectedType === 'results') {
				setResults(prev => prev.filter((_, i) => i !== selectedIndex));
			} else if (selectedType === 'events') {
				setEvents(prev => prev.filter((_, i) => i !== selectedIndex));
			} else if (selectedType === 'attendance') {
				setAttendance(prev => prev.filter((_, i) => i !== selectedIndex));
			}
		}
		setShowDeleteModal(false);
	};

	const [editRow, setEditRow] = React.useState<EditRowType>({});

	React.useEffect(() => {
		if (showEditModal && selectedType !== null && selectedIndex !== null) {
			let row = null;
			if (selectedType === 'results' && results[selectedIndex]) {
				row = results[selectedIndex];
			} else if (selectedType === 'events' && events[selectedIndex]) {
				row = events[selectedIndex];
			} else if (selectedType === 'attendance' && attendance[selectedIndex]) {
				row = attendance[selectedIndex];
			}
			setEditRow(row ? { ...row } : {});
		}
	}, [showEditModal, selectedType, selectedIndex, results, events, attendance]);

	const handleEditFieldChange = (field: string, value: string | number) => {
		setEditRow((prev) => ({ ...prev, [field]: value }));
	};

	const handleConfirmEdit = () => {
		if (selectedType && selectedIndex !== null) {
			if (selectedType === 'results') {
				setResults(prev => prev.map((item, i) => i === selectedIndex ? { ...item, ...editRow } : item));
			} else if (selectedType === 'events') {
				setEvents(prev => prev.map((item, i) => {
					if (i !== selectedIndex) return item;
					// Build updated event with correct types
					const updated: EdufamEvent = {
						...item,
						...editRow,
						start: (typeof editRow.start === 'string') ? new Date(editRow.start) : (editRow.start instanceof Date ? editRow.start : item.start),
						end: (typeof editRow.end === 'string') ? new Date(editRow.end) : (editRow.end instanceof Date ? editRow.end : item.end),
						id: typeof editRow.id === 'number' ? editRow.id : (typeof item.id === 'number' ? item.id : 0)
					};
					return updated;
				}));
			} else if (selectedType === 'attendance') {
				setAttendance(prev => prev.map((item, i) => i === selectedIndex ? { ...item, ...editRow } : item));
			}
		}
		setShowEditModal(false);
	};

	const tableStyle = {
		borderRadius: 10,
		overflow: 'hidden',
		boxShadow: '0 2px 8px rgba(30,10,60,0.07)'
	};

	const thStyle: React.CSSProperties = {
		background: '#00bcd4',
		color: '#fff',
		fontWeight: 600,
		border: 'none',
		letterSpacing: '0.03em',
		textAlign: 'center' as const,
		verticalAlign: 'middle' as const,
		fontSize: '1.05em'
	};



			// Filter helpers for term (for results and attendance, which have 'term')
				// Normalize term for comparison (handles '1', 'Term 1', etc.)
						const normalizeTerm = (term: string = '') => {
							const t = (term || '').toString().trim().toLowerCase().replace(/\s+/g, '');
							if (t === '1' || t === 'term1') return 'term1';
							if (t === '2' || t === 'term2') return 'term2';
							if (t === '3' || t === 'term3') return 'term3';
							return t;
						};
					const filterByTerm = <T extends { term?: string }>(arr: T[]) =>
						selectedTerm
							? arr.filter(item => normalizeTerm(item.term) === normalizeTerm(selectedTerm))
							: arr;

						// For events, filter by term if event has a 'term' property (optional)

	return (
		<>
			{/* Edit Modal */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Edit {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : ''}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ textAlign: 'center', padding: '1rem' }}>
						{editRow && Object.keys(editRow).length > 0 && (
							<form>
								{Object.entries(editRow).map(([key, value]) => (
									(typeof value === 'string' || typeof value === 'number') ? (
										<div key={key} style={{ marginBottom: '0.8em', textAlign: 'left' }}>
											<label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
											<input
												type={typeof value === 'number' ? 'number' : 'text'}
												value={value ?? ''}
												onChange={e => handleEditFieldChange(key, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
												style={{ width: '100%', padding: '0.5em', borderRadius: 6, border: '1px solid #ccc' }}
											/>
										</div>
									) : null
								))}
							</form>
						)}
						{selectedIndex !== null && (
							<p style={{ fontSize: '0.95em', color: '#888' }}>Editing row #{selectedIndex + 1}</p>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
					<Button variant="primary" onClick={handleConfirmEdit}>Save Changes</Button>
				</Modal.Footer>
			</Modal>
			{/* Delete Modal */}
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ textAlign: 'center', padding: '1rem' }}>
						<i className="bi bi-exclamation-triangle" style={{ fontSize: '2.5em', color: '#dc3545', marginBottom: '1rem' }}></i>
						<p>Are you sure you want to delete this entry?</p>
						{selectedIndex !== null && (
							<p style={{ fontSize: '0.95em', color: '#888' }}>Deleting row #{selectedIndex + 1}</p>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
					<Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
				</Modal.Footer>
			</Modal>
			<div className="row dashboard-tab-section" style={{ minHeight: '68vh', minWidth: '', marginTop: '8px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', paddingTop: 12 }}>
				<div className="row">
					{/* Term Filter Dropdown */}
					<div className="col-12 mb-4 d-flex align-items-center justify-content-center" style={{ gap: 12 }}>
						<div style={{
							background: '#00bcd4',
							borderRadius: '12px',
							padding: '1rem 1.5rem',
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
							boxShadow: '0 4px 16px rgba(108, 99, 255, 0.2)',
							border: '1px solid rgba(255,255,255,0.1)'
						}}>
							<div style={{
								background: 'rgba(255,255,255,0.2)',
								borderRadius: '8px',
								padding: '0.5rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<i className="bi bi-funnel" style={{ fontSize: '1.2rem', color: '#fff' }}></i>
							</div>
							<label htmlFor="termFilter" style={{ 
								fontWeight: 600, 
								color: '#fff', 
								margin: 0,
								fontSize: '1rem',
								textShadow: '0 1px 2px rgba(0,0,0,0.1)'
							}}>
								Filter by Term:
							</label>
							<select
								id="termFilter"
								className="form-select"
								style={{ 
									width: 160, 
									display: 'inline-block',
									border: '2px solid rgba(255,255,255,0.2)',
									borderRadius: '8px',
									background: 'rgba(255,255,255,0.95)',
									color: '#333',
									fontWeight: 500,
									padding: '0.5rem 0.75rem',
									transition: 'all 0.3s ease'
								}}
								value={selectedTerm}
								onChange={e => setSelectedTerm(e.target.value)}
								onFocus={e => {
									e.target.style.border = '2px solid #fff';
									e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.2)';
								}}
								onBlur={e => {
									e.target.style.border = '2px solid rgba(255,255,255,0.2)';
									e.target.style.boxShadow = 'none';
								}}
							>
								<option value="">All Terms</option>
								<option value="Term 1">Term 1</option>
								<option value="Term 2">Term 2</option>
								<option value="Term 3">Term 3</option>
							</select>
						</div>
					</div>
					{summaryType === "results" && (
						<div className="col-12">
							<div style={{ 
								background: '#00bcd4',
								borderRadius: '15px',
								padding: '1.5rem',
								marginBottom: '1.5rem',
								boxShadow: '0 8px 32px rgba(108, 99, 255, 0.15)'
							}}>
								<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
									<div style={{
										background: 'rgba(255,255,255,0.2)',
										borderRadius: '12px',
										padding: '0.8rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<i className="bi bi-clipboard-data" style={{ fontSize: '1.2rem', color: '#fff' }}></i>
									</div>
									<div>
										<h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
											Results Summary
										</h3>
										{selectedClass && (
											<p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1rem' }}>
												Class {selectedClass}
											</p>
										)}
									</div>
								</div>
							</div>
							<div style={{
								...tableStyle,
								background: '#fff',
								border: '1px solid rgba(108, 99, 255, 0.1)',
								boxShadow: '0 4px 20px rgba(108, 99, 255, 0.08)'
							}}>
								<table className="table table-hover align-middle mb-0">
								<thead>
									<tr>
											<th style={{...thStyle, background: '#00bcd4'}}>Student ID</th>
											<th style={{...thStyle, background: '#00bcd4'}}>Student Name</th>
											<th style={{...thStyle, background: '#00bcd4'}}>Grade</th>
											<th style={{...thStyle, background: '#00bcd4'}}>Term</th>
											<th style={{...thStyle, background: '#00bcd4'}}>File</th>
											<th style={{...thStyle, background: '#00bcd4'}}>Actions</th>
										</tr>
									</thead>
									<tbody>
										{(selectedClass
											? filterByTerm(results.filter(r => normalizeClass(r.studentClass || '') === normalizeClass(selectedClass)))
											: filterByTerm(results)
										).length === 0 ? (
											<tr>
												<td colSpan={6} className="text-center" style={{
													padding: '2rem',
													fontSize: '1.1rem',
													color: '#666',
													fontStyle: 'italic'
												}}>
													<i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', color: '#ddd' }}></i>
													No results uploaded
												</td>
											</tr>
										) : (
											(selectedClass
												? filterByTerm(results.filter(r => normalizeClass(r.studentClass || '') === normalizeClass(selectedClass)))
												: filterByTerm(results)
											).map((r, idx) => (
												<tr key={idx} style={{
													transition: 'all 0.3s ease',
													borderLeft: '4px solid #00bcd4 '
												}}
													onMouseEnter={e => {
														e.currentTarget.style.background = 'rgba(108, 99, 255, 0.05)';
														e.currentTarget.style.transform = 'translateX(2px)';
													}}
													onMouseLeave={e => {
														e.currentTarget.style.background = '';
														e.currentTarget.style.transform = 'translateX(0)';
													}}
												>
													<td style={{ fontWeight: 500, color: '#333' }}>{r.studentId}</td>
													<td style={{ fontWeight: 600, color: '#2c3e50' }}>{r.studentName}</td>
													<td>
														<span style={{
															background: '#00bcd4',
															color: '#fff',
															padding: '0.3rem 0.8rem',
															borderRadius: '20px',
															fontSize: '0.85rem',
															fontWeight: 600,
															textShadow: '0 1px 2px rgba(0,0,0,0.1)'
														}}>
															{r.grade}
														</span>
													</td>
													<td style={{ fontWeight: 500 }}>{r.term}</td>
													<td>
														{r.fileName ? (
															<a 
																href={r.fileDataUrl} 
																target="_blank" 
																rel="noopener noreferrer"
																style={{
																	color: '#667eea',
																	textDecoration: 'none',
																	fontWeight: 500,
																	display: 'flex',
																	alignItems: 'center',
																	gap: '0.5rem'
																}}
																onMouseEnter={e => e.currentTarget.style.color = '#764ba2'}
																onMouseLeave={e => e.currentTarget.style.color = '#667eea'}
															>
																<i className="bi bi-file-earmark-arrow-down"></i>
																{r.fileName}
															</a>
														) : (
															<span style={{ color: '#999', fontStyle: 'italic' }}>No file</span>
														)}
													</td>
													<td>
														<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
															<Button
																variant="outline-warning"
																size="sm"
																style={{
																	padding: '0.6em 0.8em',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																	boxShadow: '0 2px 8px rgba(255, 193, 7, 0.25)',
																	background: '#fff3cd',
																	borderColor: '#ffc107',
																	borderWidth: '2px',
																	borderRadius: '10px',
																	transition: 'all 0.3s ease',
																	transform: 'scale(1)'
																}}
																onMouseOver={e => {
																	e.currentTarget.style.background = '#ffc107';
																	e.currentTarget.style.color = '#fff';
																	e.currentTarget.style.transform = 'scale(1.05)';
																	e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
																}}
																onMouseOut={e => {
																	e.currentTarget.style.background = '#fff3cd';
																	e.currentTarget.style.color = '#856404';
																	e.currentTarget.style.transform = 'scale(1)';
																	e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 193, 7, 0.25)';
																}}
																onClick={() => handleEdit('results', idx)}
																title="Edit Result"
															>
																<i className="bi bi-pencil-square" style={{ fontSize: '1.1em', marginRight: '0.3rem' }}></i>
																Edit
															</Button>
															<Button
																variant="outline-danger"
																size="sm"
																style={{
																	padding: '0.6em 0.8em',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																	boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)',
																	background: '#f8d7da',
																	borderColor: '#dc3545',
																	borderWidth: '2px',
																	borderRadius: '10px',
																	transition: 'all 0.3s ease',
																	transform: 'scale(1)'
																}}
																onMouseOver={e => {
																	e.currentTarget.style.background = '#dc3545';
																	e.currentTarget.style.color = '#fff';
																	e.currentTarget.style.transform = 'scale(1.05)';
																	e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)';
																}}
																onMouseOut={e => {
																	e.currentTarget.style.background = '#f8d7da';
																	e.currentTarget.style.color = '#721c24';
																	e.currentTarget.style.transform = 'scale(1)';
																	e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.25)';
																}}
																onClick={() => handleDelete('results', idx)}
																title="Delete Result"
															>
																<i className="bi bi-trash" style={{ fontSize: '1.1em', marginRight: '0.3rem' }}></i>
																Delete
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
								<div className="col-12">
									<div style={{ 
										background: '#00bcd4',
										borderRadius: '15px',
										padding: '1.5rem',
										marginBottom: '1.5rem',
										boxShadow: '0 8px 32px rgba(233, 30, 99, 0.15)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
											<div style={{
												background: 'rgba(255,255,255,0.2)',
												borderRadius: '12px',
												padding: '0.8rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}>
												<i className="bi bi-calendar-event" style={{ fontSize: '1.2rem', color: '#fff' }}></i>
											</div>
											<div>
												<h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
													Events Summary
												</h3>
												{selectedClass && (
													<p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1rem' }}>
														Class {selectedClass}
													</p>
												)}
											</div>
										</div>
										{/* Download Event Summary Button */}
										<div style={{ marginTop: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
											<span style={{ fontWeight: 500, color: '#fff', fontSize: '1rem' }}>Download Event Summary:</span>
											<Button variant="outline-light" size="sm" onClick={() => handleDownload(events, 'excel')} style={{ fontWeight: 600 }}>
												<i className="bi bi-file-earmark-excel" style={{ marginRight: 6 }}></i> Excel (Recommended)
											</Button>
											<Button variant="outline-light" size="sm" onClick={() => handleDownload(events, 'pdf')} style={{ fontWeight: 600 }}>
												<i className="bi bi-file-earmark-pdf" style={{ marginRight: 6 }}></i> PDF
											</Button>
										</div>
									</div>
									<div style={{
										...tableStyle,
										background: '#fff',
										border: '1px solid rgba(233, 30, 99, 0.1)',
										boxShadow: '0 4px 20px rgba(233, 30, 99, 0.08)'
									}}>
									<table className="table table-hover align-middle mb-0">
										<thead>
											<tr>
												<th style={{...thStyle, background: '#00bcd4'}}>Event Name</th>
												<th style={{...thStyle, background: '#00bcd4'}}>Date</th>
												<th style={{...thStyle, background: '#00bcd4'}}>Start Time</th>
												<th style={{...thStyle, background: '#00bcd4'}}>End Time</th>
												<th style={{...thStyle, background: '#00bcd4'}}>Description</th>
												<th style={{...thStyle, background: '#00bcd4'}}>Actions</th>
											</tr>
										</thead>
										<tbody>
											{events.length === 0 ? (
												<tr>
													<td colSpan={6} className="text-center" style={{
														padding: '2rem',
														fontSize: '1.1rem',
														color: '#666',
														fontStyle: 'italic'
													}}>
														<i className="bi bi-calendar-x" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', color: '#ddd' }}></i>
														No events uploaded
													</td>
												</tr>
											) : (
												events.map((ev, idx) => (
													<tr key={idx} style={{
														transition: 'all 0.3s ease',
														borderLeft: '4px solid #00bcd4'
													}}
														onMouseEnter={e => {
															e.currentTarget.style.background = 'rgba(233, 30, 99, 0.05)';
															e.currentTarget.style.transform = 'translateX(2px)';
														}}
														onMouseLeave={e => {
															e.currentTarget.style.background = '';
															e.currentTarget.style.transform = 'translateX(0)';
														}}
													>
														<td style={{ fontWeight: 600, color: '#2c3e50' }}>{ev.title}</td>
														<td style={{ fontWeight: 500 }}>{ev.start ? new Date(ev.start).toLocaleDateString() : ''}</td>
														<td style={{ fontWeight: 500 }}>{ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
														<td style={{ fontWeight: 500 }}>{ev.end ? new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
														<td style={{ color: '#555', maxWidth: '200px', wordBreak: 'break-word' }}>{ev.description}</td>
														<td>
															<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
																<Button
																	variant="outline-warning"
																	size="sm"
																	style={{
																		padding: '0.6em 0.8em',
																		display: 'flex',
																		alignItems: 'center',
																		justifyContent: 'center',
																		boxShadow: '0 2px 8px rgba(255, 193, 7, 0.25)',
																		background: '#fff3cd',
																		borderColor: '#ffc107',
																		borderWidth: '2px',
																		borderRadius: '10px',
																		transition: 'all 0.3s ease',
																		transform: 'scale(1)'
																	}}
																	onMouseOver={e => {
																		e.currentTarget.style.background = '#ffc107';
																		e.currentTarget.style.color = '#fff';
																		e.currentTarget.style.transform = 'scale(1.05)';
																		e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
																	}}
																	onMouseOut={e => {
																		e.currentTarget.style.background = '#fff3cd';
																		e.currentTarget.style.color = '#856404';
																		e.currentTarget.style.transform = 'scale(1)';
																		e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 193, 7, 0.25)';
																	}}
																	onClick={() => handleEdit('events', idx)}
																	title="Edit Event"
																>
																	<i className="bi bi-pencil-square" style={{ fontSize: '1em', marginRight: '0.3rem' }}></i>
																	Edit
																</Button>
																<Button
																	variant="outline-danger"
																	size="sm"
																	style={{
																		padding: '0.6em 0.8em',
																		display: 'flex',
																		alignItems: 'center',
																		justifyContent: 'center',
																		boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)',
																		background: '#f8d7da',
																		borderColor: '#dc3545',
																		borderWidth: '2px',
																		borderRadius: '10px',
																		transition: 'all 0.3s ease',
																		transform: 'scale(1)'
																	}}
																	onMouseOver={e => {
																		e.currentTarget.style.background = '#dc3545';
																		e.currentTarget.style.color = '#fff';
																		e.currentTarget.style.transform = 'scale(1.05)';
																		e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)';
																	}}
																	onMouseOut={e => {
																		e.currentTarget.style.background = '#f8d7da';
																		e.currentTarget.style.color = '#721c24';
																		e.currentTarget.style.transform = 'scale(1)';
																		e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.25)';
																	}}
																	onClick={() => handleDelete('events', idx)}
																	title="Delete Event"
																>
																	<i className="bi bi-trash" style={{ fontSize: '1em', marginRight: '0.3rem' }}></i>
																	Delete
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
						   <div className="col-12">
							   <div className="teacher-summary-card">
								   <div className="teacher-summary-header">
									   <div className="teacher-summary-icon">
										   <i className="bi bi-person-check" style={{ fontSize: '1.2rem', color: '#fff' }}></i>
									   </div>
									   <div>
										   <h3 className="teacher-summary-title" style={{ color: '#fff' }}>Attendance Summary</h3>
										   {selectedClass && (
											   <p className="teacher-summary-class">Class {selectedClass}</p>
										   )}
									   </div>
								   </div>
								   {/* Download Attendance Summary Button */}
								   <div className="teacher-download-row">
									   <span className="teacher-download-label">Download Attendance Summary:</span>
									   <Button variant="outline-light" size="sm" onClick={() => handleDownloadAttendance(attendance, 'excel')} style={{ fontWeight: 600 }}>
										   <i className="bi bi-file-earmark-excel" style={{ marginRight: 6 }}></i> Excel (Recommended)
									   </Button>
									   <Button variant="outline-light" size="sm" onClick={() => handleDownloadAttendance(attendance, 'pdf')} style={{ fontWeight: 600 }}>
										   <i className="bi bi-file-earmark-pdf" style={{ marginRight: 6 }}></i> PDF
									   </Button>
								   </div>
							   </div>
							   <div className="teacher-table-container">
							   <table className="table table-hover align-middle mb-0">
								   <thead>
									   <tr>
										   <th className="teacher-table-th">Student ID</th>
										   <th className="teacher-table-th">Student Name</th>
										   <th className="teacher-table-th">Term</th>
										   <th className="teacher-table-th">Attendance (%)</th>
										   <th className="teacher-table-th">Actions</th>
									   </tr>
								   </thead>
								   <tbody>
									   {(() => {
										   const filteredAttendance = selectedClass
											   ? attendance.filter(a => normalizeClass(a.studentClass || '') === normalizeClass(selectedClass))
											   : attendance;
										   const filteredByTerm = filterByTerm(filteredAttendance);
										   if (filteredByTerm.length === 0) {
											   return (
												   <tr>
													   <td colSpan={5} className="text-center" style={{
														   padding: '2rem',
														   fontSize: '1.1rem',
														   color: '#666',
														   fontStyle: 'italic'
													   }}>
														   <i className="bi bi-person-x" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', color: '#ddd' }}></i>
														   No attendance uploaded
													   </td>
												   </tr>
											   );
										   }
										   return filteredByTerm.map((a, idx) => (
											   <tr key={idx} style={{
												   transition: 'all 0.3s ease',
												   borderLeft: '4px solid #00bcd4'
											   }}
												   onMouseEnter={e => {
													   e.currentTarget.style.background = 'rgba(0, 188, 212, 0.05)';
													   e.currentTarget.style.transform = 'translateX(2px)';
												   }}
												   onMouseLeave={e => {
													   e.currentTarget.style.background = '';
													   e.currentTarget.style.transform = 'translateX(0)';
												   }}
											   >
												   <td style={{ fontWeight: 500, color: '#333' }}>{a.studentId}</td>
												   <td style={{ fontWeight: 600, color: '#2c3e50' }}>{a.studentName}</td>
												   <td style={{ fontWeight: 500 }}>{a.term}</td>
												   <td>
													   <span style={{
														   background: a.attendancePercent >= 80 
															   ? '#28a745' 
															   : a.attendancePercent >= 60 
															   ? '#ffc107' 
															   : '#dc3545',
														   color: '#fff',
														   padding: '0.4rem 0.8rem',
														   borderRadius: '20px',
														   fontSize: '0.9rem',
														   fontWeight: 600,
														   textShadow: '0 1px 2px rgba(0,0,0,0.1)',
														   display: 'inline-flex',
														   alignItems: 'center',
														   gap: '0.3rem'
													   }}>
														   <i className={`bi ${a.attendancePercent >= 80 ? 'bi-check-circle' : a.attendancePercent >= 60 ? 'bi-exclamation-circle' : 'bi-x-circle'}`}></i>
														   {a.attendancePercent}%
													   </span>
												   </td>
												   <td>
													   <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
														   <Button
															   variant="outline-warning"
															   size="sm"
															   style={{
																   padding: '0.6em 0.8em',
																   display: 'flex',
																   alignItems: 'center',
																   justifyContent: 'center',
																   boxShadow: '0 2px 8px rgba(255, 193, 7, 0.25)',
																   background: '#fff3cd',
																   borderColor: '#ffc107',
																   borderWidth: '2px',
																   borderRadius: '10px',
																   transition: 'all 0.3s ease',
																   transform: 'scale(1)'
															   }}
															   onMouseOver={e => {
																   e.currentTarget.style.background = '#ffc107';
																   e.currentTarget.style.color = '#fff';
																   e.currentTarget.style.transform = 'scale(1.05)';
																   e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.4)';
															   }}
															   onMouseOut={e => {
																   e.currentTarget.style.background = '#fff3cd';
																   e.currentTarget.style.color = '#856404';
																   e.currentTarget.style.transform = 'scale(1)';
																   e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 193, 7, 0.25)';
															   }}
															   onClick={() => handleEdit('attendance', idx)}
															   title="Edit Attendance"
														   >
															   <i className="bi bi-pencil-square" style={{ fontSize: '1em', marginRight: '0.3rem' }}></i>
															   Edit
														   </Button>
														   <Button
															   variant="outline-danger"
															   size="sm"
															   style={{
																   padding: '0.6em 0.8em',
																   display: 'flex',
																   alignItems: 'center',
																   justifyContent: 'center',
																   boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)',
																   background: '#f8d7da',
																   borderColor: '#dc3545',
																   borderWidth: '2px',
																   borderRadius: '10px',
																   transition: 'all 0.3s ease',
																   transform: 'scale(1)'
															   }}
															   onMouseOver={e => {
																   e.currentTarget.style.background = '#dc3545';
																   e.currentTarget.style.color = '#fff';
																   e.currentTarget.style.transform = 'scale(1.05)';
																   e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)';
															   }}
															   onMouseOut={e => {
																   e.currentTarget.style.background = 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
																   e.currentTarget.style.color = '#721c24';
																   e.currentTarget.style.transform = 'scale(1)';
																   e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.25)';
															   }}
															   onClick={() => handleDelete('attendance', idx)}
															   title="Delete Attendance"
														   >
															   <i className="bi bi-trash" style={{ fontSize: '1em', marginRight: '0.3rem' }}></i>
															   Delete
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
		   </>
	   );
}

export default TeacherView;
