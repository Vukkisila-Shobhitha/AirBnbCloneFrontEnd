import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingInfo = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
        setError('Error fetching booking');
      }
    };

    if (bookingId) {
      getBooking();
    }
  }, [bookingId]);

  if (!bookingId) {
    return <p>Booking ID is required</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Booking Information</h2>
      <p>ID: {booking._id}</p>
      <p>Name: {booking.name}</p>
      {/* Display other booking details */}
    </div>
  );
};

BookingInfo.propTypes = {
  bookingId: PropTypes.string.isRequired,
};

export default BookingInfo;