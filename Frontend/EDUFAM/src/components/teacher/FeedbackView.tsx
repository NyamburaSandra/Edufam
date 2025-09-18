import React from 'react';
import feedbackData from '../../data/seed_data.json';

const FeedbackView: React.FC = () => {
	return (
		<>
			<h3>Parent Feedback</h3>
			<div className="mt-4">
				<ul className="list-group">
					{/* Display feedback from seed_data.json */}
					{(feedbackData.feedback as Array<{ parentEmail: string; concern: string; message: string }>).map((fb, idx) => (
						<li className="list-group-item" key={idx}>
							<strong>Parent Email:</strong> {fb.parentEmail}<br />
							<strong>Concern Type:</strong> {fb.concern}<br />
							<strong>Message:</strong> {fb.message}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default FeedbackView;
