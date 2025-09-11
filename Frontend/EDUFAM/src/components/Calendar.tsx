import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="calendar-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2>School Calendar</h2>
            <p>View upcoming events, holidays, and important dates.</p>
            {/* Add calendar content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
