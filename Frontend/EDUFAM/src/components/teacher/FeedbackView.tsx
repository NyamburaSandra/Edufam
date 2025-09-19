
import React from 'react';
import { useFeedback } from '../../context/useFeedback';
import type { Feedback } from '../../context/FeedbackContextObject';

const FeedbackView: React.FC = () => {
		const { feedbacks } = useFeedback();

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
											{feedbacks.map((fb: Feedback, idx: number) => (
												<div className="list-group-item" key={idx}>
													<div>
														<strong>Parent Email:</strong> {fb.parentEmail}<br />
														<strong>Concern Type:</strong> {fb.concernType}<br />
														<strong>Message:</strong> {fb.message}
														{fb.requestCallback && <div><strong>⚠️ Requests Callback</strong></div>}
														{fb.scheduleMeeting && <div><strong>📅 Requests Meeting</strong></div>}
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
