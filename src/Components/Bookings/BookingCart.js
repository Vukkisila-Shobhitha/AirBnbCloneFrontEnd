import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../../Context/UserContext.js';
import axiosConnect from '../../Token/axios.js';
import PropTypes from 'prop-types';

function BookingCart({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);

  const numberOfNights = checkIn && checkOut ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) : 0;

  async function bookNow() {
    if (!username.trim() || !checkIn || !checkOut || !phone.trim()) {
      return toast.error('Please fill all the fields');
    }

    try {
      const response = await axiosConnect.post('/bookings', {
        checkIn,
        checkOut,
        numberOfGuests: parseInt(numberOfGuests, 10),
        username,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });

      const bookingId = response.data.booking._id;
      toast.success(`Congrats ${username}! Enjoy your trip.`);
      navigate(`/userprofile/bookings/${bookingId}`);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error('Error: ', error.response ? error.response.data : error);
    }
  }

  return (
    <div>
      <hr />
      <div>
        <h5 className="bold-cls">Booking Info</h5>
        <div className="pad-mar-sm">
          <b>Price:</b> ₹ {place.price} / per night
        </div>
        <div>
          <div>
            <div className="pad-mar-sm">
              <label className="bold-cls">Check In: &nbsp;&nbsp;</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="pad-mar-sm">
              <label className="bold-cls">Check Out:&nbsp;&nbsp;</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="pad-mar-sm">
            <label className="bold-cls">Number of guests:&nbsp;&nbsp;</label>
            <input
              type="number"
              min="1"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div>
              <div className="pad-mar-sm">
                <label className="bold-cls">Your full name:&nbsp;&nbsp;</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="pad-mar-sm">
                <label className="bold-cls">Phone number:&nbsp;&nbsp;</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="btn-login">
          <button onClick={bookNow} className="btn-show">
            Book Now
            {numberOfNights > 0 && (
              <span> ₹ {numberOfNights * place.price}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

BookingCart.propTypes = {
  place: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default BookingCart;