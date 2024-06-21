//import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Link } from 'react-router-dom';
import PlaceImages from './PlaceImages.js';

function PlaceCard({ place }) {
    return (
        <div className="card-box m-2 col">
            <Link
                to={`/userprofile/places/${place._id}`}
                className="card-txt card place-card"
                key={place._id}
                aria-label={`View details of ${place.title}`}
            >
                <div>
                    <PlaceImages place={place} />
                </div>
                <div className="card-body App">
                    <h4 className="card-title" style={{ textDecoration: "none" }}>{place.title}</h4>
                    <p className="card-text">{place.address}</p>
                </div>
            </Link>
        </div>
    );
}

// PropTypes validation for PlaceCard
PlaceCard.propTypes = {
    place: PropTypes.shape({
        _id: PropTypes.string.isRequired, // _id is a string and is required
        title: PropTypes.string.isRequired, // title is a string and is required
        address: PropTypes.string.isRequired, // address is a string and is required
        // Add other properties as needed
    }).isRequired,
};

export default PlaceCard;