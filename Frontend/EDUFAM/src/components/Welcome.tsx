import React, { useEffect } from 'react';
import "../assets/style/Welcome.css";
import CustomNavbar from './Navbar';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const Welcome: React.FC = () => {
	const { isSignedIn, user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSignedIn && user) {
			const teacherEmail = "sandranyambura72@gmail.com";
			if (user.primaryEmailAddress?.emailAddress === teacherEmail) {
				navigate('/teacher', { replace: true });
			} else {
				navigate('/parent', { replace: true });
			}
		}
	}, [isSignedIn, user, navigate]);

	return (
		<>
			<CustomNavbar />
			<section className="welcome-section">
				<h1 className="welcome-title">Welcome to EDUFAM</h1>
				<p className="welcome-desc">
					Bridging the communication gap between teachers and parents for student success. Stay connected, informed, and engaged with your school community—all in one place.
				</p>
				<a href="#learn-more" className="welcome-learn-btn">Learn More</a>
			</section>
			<section id="learn-more" className="why-choose-section">
				<h2 className="why-choose-title">Why Choose EDUFAM?</h2>
				<div className="welcome-features">
					<div className="welcome-feature-card">
						<span className="welcome-feature-icon">
							{/* Chat/Message SVG */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="url(#chat-gradient)"/>
								<path d="M13 18h14M13 22h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
								<defs>
									<linearGradient id="chat-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
										<stop stopColor="#fb7100"/>
										<stop offset="1" stopColor="#ffd600"/>
									</linearGradient>
								</defs>
							</svg>
						</span>
						<h3 className="welcome-feature-title">All-in-One Communication</h3>
						<p className="welcome-feature-desc">Messaging, announcements, and updates in one secure platform.</p>
					</div>
					<div className="welcome-feature-card">
						<span className="welcome-feature-icon">
							{/* Bell/Notification SVG */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="url(#bell-gradient)"/>
								<path d="M20 28a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-4V18a6 6 0 1 0-12 0v6l-2 2v1h16v-1l-2-2z" fill="#fff"/>
								<defs>
									<linearGradient id="bell-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
										<stop stopColor="#0d6efd"/>
										<stop offset="1" stopColor="#00e0ff"/>
									</linearGradient>
								</defs>
							</svg>
						</span>
						<h3 className="welcome-feature-title">Stay Informed</h3>
						<p className="welcome-feature-desc">Real-time notifications about your child’s progress, attendance, and school events.</p>
					</div>
					<div className="welcome-feature-card">
						<span className="welcome-feature-icon">
							{/* Sparkle/Star SVG */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="url(#star-gradient)"/>
								<path d="M20 12l2.09 6.26H28l-5.18 3.76L24.18 28 20 24.27 15.82 28l1.36-5.98L12 18.26h5.91z" fill="#fff"/>
								<defs>
									<linearGradient id="star-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
										<stop stopColor="#198754"/>
										<stop offset="1" stopColor="#a8ff78"/>
									</linearGradient>
								</defs>
							</svg>
						</span>
						<h3 className="welcome-feature-title">Easy to Use</h3>
						<p className="welcome-feature-desc">Intuitive design for parents and teachers of all tech levels.</p>
					</div>
					<div className="welcome-feature-card">
						<span className="welcome-feature-icon">
							{/* Lock/Security SVG */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="url(#lock-gradient)"/>
								<rect x="13" y="18" width="14" height="10" rx="2" fill="#fff"/>
								<rect x="17" y="14" width="6" height="6" rx="3" fill="#fff"/>
								<defs>
									<linearGradient id="lock-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
										<stop stopColor="#6f42c1"/>
										<stop offset="1" stopColor="#e0c3fc"/>
									</linearGradient>
								</defs>
							</svg>
						</span>
						<h3 className="welcome-feature-title">Secure & Private</h3>
						<p className="welcome-feature-desc">Your data is protected with industry-leading security.</p>
					</div>
				</div>
				<p className="welcome-signin">
					Ready to experience seamless school communication? <br />
					<a href="/sign-in">Sign in</a> or <a href="/sign-up">Create an account</a> today!
				</p>
			</section>
		</>
	);
};

export default Welcome;
