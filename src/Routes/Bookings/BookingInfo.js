import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
//import axios from 'axios';
import axiosConnect from '../../Token/axios.js';
import { getItemFromLS } from '../../Token/script.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';


const BookingInfo = () => {  
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const token = getItemFromLS('token');
    const getBooking = async () => {
      try {
        console.log('bookingId: '+id);
        if (!id) return; // Exit early if bookingId is null
        console.log('postbookingId: '+id);

        const response = await axiosConnect.get('/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      });
        console.log('postresponse: '+JSON.stringify(response));
        const filteredBooking = response.data.bookings.filter(
          (booking) => booking._id === id
        );
        setBooking(filteredBooking[0]);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    getBooking();
  }, [id]); // Run effect whenever bookingId changes

  if (!id) {
    return <p>Booking ID is required</p>; // Render a message if bookingId is null
  }

  return (
    <div>
      {booking ? (
        <div>
          <h2>Booking Information</h2>
          <p>ID: {booking._id}</p>
          <p>Name: {booking.username}</p>
          {/* Render other booking details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="App pad-mar">
        <Link to={"/"} className="link-switch comp-section" aria-label="Back to Home">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />&nbsp;&nbsp;Back To Home
        </Link>
      </div>
    </div>
    
  );
};

BookingInfo.propTypes = {
  bookingId: PropTypes.string, // Remove .isRequired if null is a valid state
};

export default BookingInfo;
