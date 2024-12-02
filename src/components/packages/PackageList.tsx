import React from 'react';
import { useQuery } from 'react-query';
import { packageService } from '../../services/package.service';
import { Package } from '../../types';
import { CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '../layout/LoadingSpinner';
import { ErrorMessage } from '../layout/ErrorMessage';
import { formatCurrency } from '../../utils/format';

export function PackageList() {
  const { data: packages, isLoading, error } = useQuery<Package[], Error>(
    'packages',
    () => packageService.getAllPackages(),
    {
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      retry: 2
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!packages?.length) {
    return (
      <div className="text-center py-8 text-gray-600">
        No packages available at the moment.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Membership Packages
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect membership package for your fitness journey
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                <p className="mt-4 text-gray-600">{pkg.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{pkg.duration} months
                  </span>
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-600">
                      {pkg.duration} months access
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-600">
                      Full access to gym facilities
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-600">
                      Fitness assessment included
                    </span>
                  </li>
                </ul>

                <button className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}