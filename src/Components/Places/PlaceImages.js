//import React from 'react';
import PropTypes from 'prop-types';

function PlaceImages({ place, className = '' }) {
    if (!place || !place.photos || place.photos.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className={className}>
            <img 
                className="card-img-top card-img" 
                src={place.photos[0]} 
                alt={`${place.title} Image`} 
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
}

PlaceImages.propTypes = {
    place: PropTypes.shape({
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
};

export default PlaceImages;