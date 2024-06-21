import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLeftLong } from '@fortawesome/free-solid-svg-icons';

import PlaceGallery from '../../Components/Places/PlaceGallery.js';
import Address from '../../Components/Places/Address.js';
import BookingCart from '../../Components/Bookings/BookingCart.js';
import Spinner from '../../Components/Spinner/Spinner.js';
import PerksGallery from '../../Components/Perks/PerksGallery.js';
import axiosConnect from '../../Token/axios.js';

function PlaceInfo() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    const fetchPlace = async () => {
      try {
        const { data } = await axiosConnect.get(`/places/${id}`);
        setPlace(data.place);
      } catch (error) {
        console.error('Error fetching place:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return (
      <div className="App pad-mar">
        <p>No place found!</p>
      </div>
    );
  }

  return (
    <div>
      <nav className="comp-section-div">
        <Link to={"/userprofile"} className="link-switch comp-section-disable">
          <FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile
        </Link>
        <Link to={"/userprofile/bookings"} className="link-switch comp-section-disable">
          <FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings
        </Link>
        <Link to={"/userprofile/places"} className="link-switch comp-section">
          <FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places
        </Link>
      </nav>

      <div className="App pad-mar">
        <Link to={"/"} className="link-switch comp-section">
          <FontAwesomeIcon icon={faLeftLong} />&nbsp;&nbsp;Back To Home
        </Link>
      </div>

      <div className="pad-mar">
        <h3>{place.title}</h3>
        <Address placeAddress={place.address} />
        <PlaceGallery place={place} />
        
        <div className="pad-mar">
          <div>
            <h5 className="bold-cls">Description</h5>
            <p>{place.description}</p>
            <p>Check-in: {place.checkIn}</p>
            <p>Check-out: {place.checkOut}</p>
            <p>Max number of guests: {place.maxGuests}</p>
            <PerksGallery perks={place.perks} />
          </div>
        </div>

        <hr />

        <div className="pad-mar">
          <div>
            <h5 className="bold-cls">Extra Info</h5>
            <p>{place.extraInfo}</p>
          </div>
        </div>

        <div className="pad-mar">
          <BookingCart place={place} />
        </div>
      </div>
    </div>
  );
}

export default PlaceInfo;