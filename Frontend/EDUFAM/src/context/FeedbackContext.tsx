

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import seedData from '../data/seed_data.json';
import { FeedbackContext } from './FeedbackContextObject';
import type { Feedback } from './FeedbackContextObject';

function isFeedbackArray(arr: unknown): arr is Feedback[] {
  return Array.isArray(arr) && arr.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Feedback).concernType === 'string' &&
      typeof (item as Feedback).message === 'string' &&
      typeof (item as Feedback).requestCallback === 'boolean' &&
      typeof (item as Feedback).scheduleMeeting === 'boolean'
  );
}



export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    if (isFeedbackArray((seedData as { feedback?: unknown }).feedback)) {
      setFeedbacks((seedData as { feedback: Feedback[] }).feedback);
    }
  }, []);

  const addFeedback = (feedback: Feedback) => {
    setFeedbacks(prev => [...prev, feedback]);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};



