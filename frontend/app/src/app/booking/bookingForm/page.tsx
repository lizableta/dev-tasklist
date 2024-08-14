'use client'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BookingForm: React.FC = () => {
    const [service, setService] = useState<string>('');
    const [doctorName, setDoctorName] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const router = useRouter();

    const formatTimeToAmPm = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentTime = `${currentHours}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}`;
        const isToday = currentDate.toISOString().split('T')[0] === date;

        
        if (endTime <= startTime) {
            toast.error('End time cannot be before start time.');
            return;
        }

       
        if (isToday && startTime < currentTime) {
            toast.error('Start time cannot be earlier than the current time.');
            return;
        }

        setPending(true);

        const formattedStartTime = formatTimeToAmPm(startTime);
        const formattedEndTime = formatTimeToAmPm(endTime);

        const formData = {
            service,
            doctor_name: doctorName,
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            date,
        };

        try {
            const res = await fetch('http://host.docker.internal:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseText = await res.text();
            if (res.status === 201) {
                toast.success(responseText);
                router.push('/');
                router.refresh();
            } else {
                toast.error(responseText);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        } finally {
            setPending(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="h-screen flex items-center justify-center px-4 md:px-0 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-800 dark:to-gray-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-white"
            >
                <h2 className="text-center text-2xl font-bold mb-6">Book Your Appointment</h2>

                <div className="mb-4">
                    <label htmlFor="service" className="block text-sm font-medium mb-2">Service</label>
                    <input
                        type="text"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="doctor_name" className="block text-sm font-medium mb-2">Doctor Name</label>
                    <input
                        type="text"
                        name="doctor_name"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="start_time" className="block text-sm font-medium mb-2">Start Time</label>
                        <input
                            type="time"
                            name="start_time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="end_time" className="block text-sm font-medium mb-2">End Time</label>
                        <input
                            type="time"
                            name="end_time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                        required
                        min={today} 
                    />
                </div>

                <button
                    disabled={pending}
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500 transition duration-200"
                >
                    {pending ? 'Submitting...' : 'Book Now'}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;
