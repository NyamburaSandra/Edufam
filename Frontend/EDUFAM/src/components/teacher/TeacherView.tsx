import React from 'react';
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

	return (
		<div className="row dashboard-tab-section">
			{selectedClass && (
				<div className="row">
					{summaryType === "results" && (
						<div className="col-md-6">
							<h3>Results Summary - {selectedClass}</h3>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Student ID</th>
										<th>Student Name</th>
										<th>Grade</th>
										<th>Term</th>
										<th>File</th>
									</tr>
								</thead>
								<tbody>
									{results.filter(r => r.studentClass === selectedClass).length === 0 ? (
										<tr><td colSpan={5} className="text-center">No results uploaded</td></tr>
									) : (
										results.filter(r => r.studentClass === selectedClass).map((r, idx) => (
											<tr key={idx}>
												<td>{r.studentId}</td>
												<td>{r.studentName}</td>
												<td>{r.grade}</td>
												<td>{r.term}</td>
												<td>{r.fileName ? <a href={r.fileDataUrl} target="_blank" rel="noopener noreferrer">{r.fileName}</a> : '—'}</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}
					{summaryType === "events" && (
						<div className="col-md-6">
							<h3>Events Summary - {selectedClass}</h3>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Event Name</th>
										<th>Date</th>
										<th>Start Time</th>
										<th>End Time</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{events.length === 0 ? (
										<tr><td colSpan={5} className="text-center">No events uploaded</td></tr>
									) : (
										events.map((ev, idx) => (
											<tr key={idx}>
												<td>{ev.title}</td>
												<td>{ev.start ? new Date(ev.start).toLocaleDateString() : ''}</td>
												<td>{ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
												<td>{ev.end ? new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</td>
												<td>{ev.description}</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}
					{summaryType === "attendance" && (
						<div className="col-md-6">
							<h3>Attendance Summary - {selectedClass}</h3>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Student ID</th>
										<th>Student Name</th>
										<th>Term</th>
										<th>Attendance (%)</th>
									</tr>
								</thead>
								<tbody>
									{attendance.filter(a => a.studentClass === selectedClass).length === 0 ? (
										<tr><td colSpan={4} className="text-center">No attendance uploaded</td></tr>
									) : (
										attendance.filter(a => a.studentClass === selectedClass).map((a, idx) => (
											<tr key={idx}>
												<td>{a.studentId}</td>
												<td>{a.studentName}</td>
												<td>{a.term}</td>
												<td>{a.attendancePercent}%</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default TeacherView;
