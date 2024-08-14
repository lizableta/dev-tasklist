import React from 'react';
import Link from 'next/link';

interface Booking {
    id: number;
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
}

async function getAllBookings(): Promise<Booking[]> {
    const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json() as Promise<Booking[]>;
}

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const BookingList: React.FC = async () => {
    let bookings = await getAllBookings();

    return (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-white">
            <h2 className="text-center text-2xl font-bold mb-6">Booking List</h2>
            <h3 className="text-center text-lg mb-4">Current booking count: {bookings.length}</h3>
            <ul className="space-y-4">
                {bookings.map((booking, index) => (
                    <li
                        key={index}
                        className="border-b border-gray-300 pb-3 dark:border-gray-600"
                    >
                        <Link
                            href={`/booking/${booking.id}`}
                            className="block text-lg text-blue-600 hover:underline dark:text-blue-400"
                        >
                            {`Booking on ${formatDate(booking.date)} with ${booking.doctor_name}, from ${booking.start_time} to ${booking.end_time}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
