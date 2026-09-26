import React from 'react';
import Benner from './components/homepage/Benner';
import Workout from './components/homepage/Workout';

const page = () => {
  return (
    <div>
      <Benner />
      <Workout />
    </div>
  );
};

export default page;