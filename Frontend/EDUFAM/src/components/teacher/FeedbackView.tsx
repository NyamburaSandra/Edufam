import React from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { Badge } from 'react-bootstrap';

const FeedbackView: React.FC = () => {
	const { feedbacks, markAsRead, markAsResponded } = useFeedback();

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'new':
				return <Badge bg="danger">New</Badge>;
			case 'read':
				return <Badge bg="warning">Read</Badge>;
			case 'responded':
				return <Badge bg="success">Responded</Badge>;
			default:
				return <Badge bg="secondary">Unknown</Badge>;
		}
	};

	const handleMarkAsRead = (id: string) => {
		markAsRead(id);
	};

	const handleMarkAsResponded = (id: string) => {
		markAsResponded(id);
	};

	return (
		<>
			<h3>Parent Feedback</h3>
			<div className="mt-4">
				{feedbacks.length === 0 ? (
					<div className="alert alert-info">
						No feedback received yet.
					</div>
				) : (
					<div className="list-group">
						{feedbacks.map((fb) => (
							<div className="list-group-item" key={fb.id}>
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div>
										<strong>Parent:</strong> {fb.parentName} ({fb.parentEmail})<br />
										<strong>Student:</strong> {fb.studentName} (ID: {fb.studentId})<br />
										<strong>Concern Type:</strong> {fb.concernType}<br />
										<strong>Message:</strong> {fb.message}
										{fb.requestCallback && <div><strong>⚠️ Requests Callback</strong></div>}
										{fb.scheduleMeeting && <div><strong>📅 Requests Meeting</strong></div>}
									</div>
									<div className="text-end">
										<div className="mb-2">{getStatusBadge(fb.status)}</div>
										<small className="text-muted">
											{fb.timestamp.toLocaleDateString()} {fb.timestamp.toLocaleTimeString()}
										</small>
									</div>
								</div>
								<div className="mt-2">
									{fb.status === 'new' && (
										<button 
											className="btn btn-sm btn-outline-primary me-2"
											onClick={() => handleMarkAsRead(fb.id)}
										>
											Mark as Read
										</button>
									)}
									{fb.status !== 'responded' && (
										<button 
											className="btn btn-sm btn-outline-success"
											onClick={() => handleMarkAsResponded(fb.id)}
										>
											Mark as Responded
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default FeedbackView;
