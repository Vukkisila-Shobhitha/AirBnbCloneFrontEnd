import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStreetView, faBook, faCity, faLeftLong } from '@fortawesome/free-solid-svg-icons';

import PlaceCard from '../../Components/Places/PlaceCard.js';
import axiosConnect from '../../Token/axios.js';
import { getItemFromLS } from '../../Token/script.js';
import Spinner from '../../Components/Spinner/Spinner.js';

function Places() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getItemFromLS('token');

        const fetchPlaces = async () => {
            try {
                const { data } = await axiosConnect.get('places/user-places', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlaces(data.userPlaces);
            } catch (error) {
                console.error('Error fetching places:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) {
        return <Spinner />;
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

            <div className="App pad-mar">
                <Link to={"/userprofile/places/new"} className="link-switch comp-section">
                    <FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Add new place
                </Link>
            </div>

            <div className="card-main-container container m-5">
                <div className="row">
                    {places.length > 0 ? (
                        places.map((place) => (
                            <PlaceCard place={place} key={place._id} />
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No places found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Places;