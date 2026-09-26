'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorkoutItem } from '../../types/workout';


export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [workout, setWorkout] = useState<WorkoutItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then((res) => setUnwrappedParams(res));
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams?.id) return;

    const fetchWorkout = async () => {
      try {
        const response = await fetch('/Wdata.json');
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        const data: WorkoutItem[] = await response.json();
        const found = data.find((item) => item.id === Number(unwrappedParams.id));
        setWorkout(found || null);
      } catch (err) {
        console.error('Error fetching workout detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [unwrappedParams]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToPlan = () => {
    if (!workout) return;
    const existingPlan = JSON.parse(localStorage.getItem('todaysPlan') || '[]');
    if (!existingPlan.some((item: WorkoutItem) => item.id === workout.id)) {
      localStorage.setItem('todaysPlan', JSON.stringify([...existingPlan, workout]));
      // Trigger a storage event for navbar dynamic counter updates
      window.dispatchEvent(new Event('storage'));
    }
    showToast('Added to today\'s plan');
  };

  const handleSaveForLater = () => {
    if (!workout) return;
    const existingSaved = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    if (!existingSaved.some((item: WorkoutItem) => item.id === workout.id)) {
      localStorage.setItem('savedWorkouts', JSON.stringify([...existingSaved, workout]));
      // Trigger a storage event for navbar dynamic counter updates
      window.dispatchEvent(new Event('storage'));
    }
    showToast('Saved for later');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1015] flex items-center justify-center text-white text-lg">
        Loading workout details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">WORKOUT NOT FOUND</h1>
        <p className="text-gray-400 mb-6">The requested lift does not exist in the library.</p>
        <Link href="/" className="bg-lime-400 text-black font-extrabold px-6 py-3 rounded-full uppercase tracking-wider hover:bg-lime-300 transition-colors">
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1015] min-h-screen text-white py-10 px-4 sm:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-lime-400 text-black font-bold px-5 py-3 rounded-xl shadow-lg border border-lime-300 transition-all duration-300 animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column — Visual / Media */}
        <div className="relative w-full h-[350px] sm:h-[480px] lg:h-[600px] bg-[#17181c] border border-gray-800 rounded-3xl overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Column — Information & Controls */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-lime-400 text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {workout.name}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-gray-400 italic text-sm sm:text-base leading-relaxed">
              "{workout.description}"
            </p>

            {/* Key Specs Panel Table */}
            <div className="bg-[#17181c] border border-gray-800 rounded-2xl p-5 mt-6">
              <h3 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-4 border-b border-gray-800 pb-2">
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Equipment</p>
                  <p className="font-semibold text-white mt-0.5">{workout.equipment}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Difficulty</p>
                  <p className="font-semibold text-white mt-0.5">{workout.difficulty}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Sets & Reps</p>
                  <p className="font-semibold text-white mt-0.5">{workout.sets} sets / {workout.reps}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Duration</p>
                  <p className="font-semibold text-white mt-0.5">{workout.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Calories</p>
                  <p className="font-semibold text-white mt-0.5">{workout.caloriesBurned} kcal</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Rating</p>
                  <p className="font-semibold text-white mt-0.5">⭐ {workout.rating}</p>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="mt-6">
              <h3 className="text-sm uppercase font-extrabold text-gray-300 tracking-wider mb-3">
                Instructions
              </h3>
              <ol className="space-y-3">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 bg-[#17181c]/50 p-3 rounded-xl border border-gray-800/60">
                    <span className="bg-lime-400/10 text-lime-400 font-extrabold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5 leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-800">
            <button
              onClick={handleAddToPlan}
              className="flex-1 bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-sm sm:text-base py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add to Today's Plan
            </button>
            <button
              onClick={handleSaveForLater}
              className="flex-1 bg-[#17181c] hover:bg-[#202228] text-white border border-gray-700 font-bold uppercase text-sm sm:text-base py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}