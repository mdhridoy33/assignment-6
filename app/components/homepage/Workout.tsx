import React from 'react';

const doWorkout = async () => {
    const response = await fetch ("http://localhost:3000/Wdata.json")
    const data = await response.json();
    return data;
}


const Workout = async () => {
    const Wdata = await doWorkout();
    console.log(Wdata,"Wdata");
    return (
        <section>
        <div>
            <h1>THE LIBRARY</h1>
            <p>Twelve lifts covering every major muscle group.</p>
        </div>
        {Wdata.map((workout, ind) => {
        return <div key={ind}>{workout.name}</div>
      })}
</section>
    );
};

export default Workout;