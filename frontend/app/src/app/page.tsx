import React from 'react';
import Link from 'next/link';
import BookingList from './components/bookingList';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4 md:px-0 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-white">
        <BookingList />
        <div className="py-7">
          <Link
            href="/booking/bookingForm"
            className="w-full py-4 mt-8 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500 transition duration-200"
          >
            Add a Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
