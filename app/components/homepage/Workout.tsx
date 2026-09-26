import React from 'react';
import Image from 'next/image';

interface WorkoutItem {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

const doWorkout = async (): Promise<WorkoutItem[]> => {
  try {
    const response = await fetch("http://localhost:3000/Wdata.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch workout data:", error);
    return [];
  }
};

const Workout = async () => {
  const Wdata = await doWorkout();

  return (
    <section className="bg-[#0f1015] min-h-screen py-10 px-4 sm:px-8 text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
          THE LIBRARY
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Responsive Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Wdata.map((workout) => (
          <div
            key={workout.id}
            /* Direct hover styles added without relying solely on nested groups */
            className="bg-[#17181c] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:border-lime-400 hover:shadow-2xl hover:shadow-lime-400/20 flex flex-col justify-between"
          >
            <div>
              {/* Image Container */}
              <div className="relative w-full h-52 bg-[#1d1e24] overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {workout.muscleGroups.map((group, idx) => (
                    <span
                      key={idx}
                      className="bg-lime-400 text-black font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white hover:text-lime-400 transition-colors">
                  {workout.name}
                </h2>

                {/* Equipment */}
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                  {workout.equipment}
                </p>
              </div>
            </div>

            {/* Bottom Details Footer */}
            <div className="p-5 pt-0 border-t border-gray-800/40 mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6l4 2"
                  />
                </svg>
                <span>{workout.duration} min</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
                <span>{workout.caloriesBurned} kcal</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-gray-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{workout.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workout;