'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorkoutItem } from '';


export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [planItems, setPlanItems] = useState<WorkoutItem[]>([]);
  const [savedItems, setSavedItems] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = () => {
    const plan = JSON.parse(localStorage.getItem('todaysPlan') || '[]');
    const saved = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    setPlanItems(plan);
    setSavedItems(saved);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const removeItem = (id: number, type: 'plan' | 'saved') => {
    if (type === 'plan') {
      const updated = planItems.filter((item) => item.id !== id);
      localStorage.setItem('todaysPlan', JSON.stringify(updated));
      setPlanItems(updated);
    } else {
      const updated = savedItems.filter((item) => item.id !== id);
      localStorage.setItem('savedWorkouts', JSON.stringify(updated));
      setSavedItems(updated);
    }
    window.dispatchEvent(new Event('storage'));
  };

  const currentList = activeTab === 'plan' ? planItems : savedItems;

  // Calculate live metrics summary
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  return (
    <main className="bg-[#0f1015] min-h-screen text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider">MY PLAN</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Live Metrics Summary Row */}
        <div className="grid grid-cols-3 gap-4 bg-[#17181c] border border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-black text-lime-400">{totalExercises}</p>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase mt-1">Exercises</p>
          </div>
          <div className="border-x border-gray-800">
            <p className="text-2xl sm:text-4xl font-black text-lime-400">{totalMinutes}</p>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase mt-1">Minutes</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-lime-400">{totalCalories}</p>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase mt-1">Calories</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 gap-6">
          <button
            onClick={() => setActiveTab('plan')}
            className={`pb-3 text-sm sm:text-base font-extrabold uppercase tracking-wider transition-colors relative ${
              activeTab === 'plan' ? 'text-lime-400 border-b-2 border-lime-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan ({planItems.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 text-sm sm:text-base font-extrabold uppercase tracking-wider transition-colors relative ${
              activeTab === 'saved' ? 'text-lime-400 border-b-2 border-lime-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved ({savedItems.length})
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-semibold">Loading workouts...</div>
        ) : currentList.length === 0 ? (
          /* Empty State */
          <div className="bg-[#17181c] border border-gray-800 rounded-2xl p-10 sm:p-16 text-center space-y-4">
            <h2 className="text-2xl font-black uppercase text-white">NOTHING HERE YET</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-block bg-lime-400 text-black font-extrabold px-6 py-3 rounded-full uppercase tracking-wider hover:bg-lime-300 transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          /* Workout Cards List */
          <div className="space-y-4">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#17181c] border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-[#1d1e24] rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase text-white">{workout.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{workout.equipment}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-semibold">
                      <span>⏱ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span>⭐ {workout.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="text-xs font-extrabold uppercase px-4 py-2.5 rounded-xl border border-gray-700 bg-[#0f1015] hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeItem(workout.id, activeTab)}
                    className="text-xs font-extrabold uppercase px-3 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}