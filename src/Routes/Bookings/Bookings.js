import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLongArrowAltLeft, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

import PlaceImageComponent from '../../Components/Places/PlaceImageComponent.js';
import BookingDates from '../../Components/Bookings/BookingDates.js';
import Spinner from '../../Components/Spinner/Spinner.js';
import axiosConnect from '../../Token/axios.js';
import { getItemFromLS } from '../../Token/script.js';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getItemFromLS('token');

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axiosConnect.get('/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <nav className="comp-section-div">
        <Link to={"/userprofile"} className="link-switch comp-section-disable" aria-label="My Profile">
          <FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile
        </Link>
        <Link to={"/userprofile/bookings"} className="link-switch comp-section">
          <FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings
        </Link>
        <Link to={"/userprofile/places"} className="link-switch comp-section-disable">
          <FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places
        </Link>
      </nav>

      <div className="App pad-mar">
        <Link to={"/"} className="link-switch comp-section" aria-label="Back to Home">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />&nbsp;&nbsp;Back To Home
        </Link>
      </div>

      <h4 className="pad-mar">Your Bookings</h4>

      {bookings?.length > 0 ? (
        bookings.map(booking => (
          <Link to={`/userprofile/bookings/${booking._id}`} className="" key={booking._id} style={{ textDecoration: "none" }}>
            <div className="card mb-3 booking-card">
              <div className="row g-0 info-page">
                <div className="">
                  <PlaceImageComponent id={booking.place._id} />
                </div>
                <div className="card-text">
                  <BookingDates booking={booking} className="info-page pad-mar-sm" />
                  <div className="pad-mar-sm">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} />&nbsp;&nbsp;
                    <span>Total price: ₹&nbsp;{booking.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="pad-mar">
          <div className="">
            <h1 className="">Trips</h1>
            <hr className="" />
            <h3 className="">
              No trips booked... yet!
            </h3>
            <p>
              Time to dust off your bags and start planning your next adventure.
            </p>
            <Link to="/" className="">
              <div className="">
                Start Searching
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;



