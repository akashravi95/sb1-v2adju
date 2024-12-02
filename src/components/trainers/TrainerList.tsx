import React from 'react';
import { useQuery } from 'react-query';
import { trainerService } from '../../services/trainer.service';
import { Trainer } from '../../types';
import { Medal, Star } from 'lucide-react';

export function TrainerList() {
  const { data: trainers, isLoading, error } = useQuery<Trainer[]>(
    'trainers',
    trainerService.getAllTrainers
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading trainers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading trainers</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Expert Trainers
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Work with the best fitness professionals to achieve your goals
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainers?.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
                  <div className="flex items-center">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-gray-600">{trainer.experience}+ years</span>
                  </div>
                </div>
                <p className="mt-2 flex items-center text-gray-600">
                  <Star className="h-5 w-5 text-indigo-500 mr-2" />
                  {trainer.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}