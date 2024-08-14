import React from 'react';
import Link from 'next/link';

interface BookingDetails {
  id: number;
  doctor_name: string;
  service: string;
  start_time: string;
  end_time: string;
}

async function getBookingDetails(id: string): Promise<BookingDetails> {
  const res = await fetch(`http://host.docker.internal:5000/api/booking/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<BookingDetails>;
}

const BookingDetailsComponent = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const booking = await getBookingDetails(id);

  return (
    <div className="h-screen flex items-center justify-center px-4 md:px-0 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-white">
        <p className="text-center text-lg md:text-xl lg:text-2xl font-medium mb-6">
          Booking with {booking.doctor_name} for {booking.service}. Starts at {booking.start_time} and ends at {booking.end_time}.
        </p>
        <div className="py-5 md:py-7">
          <Link
            href="/"
            className="block text-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-bold rounded-lg text-sm md:text-base lg:text-lg w-full px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsComponent;
