import React from 'react';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="teacher-dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2>Teacher Dashboard</h2>
            <p>Welcome to the teacher dashboard. This is where teachers can manage their classes and students.</p>
            {/* Add teacher-specific content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;