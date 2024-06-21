import { useState } from 'react';
import PropTypes from 'prop-types';
import Images from '../Images/Images.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function PlaceGallery({ place }) {
    const [showAllImg, setShowAllImg] = useState(false);

    if (showAllImg) {
        return (
            <div className="gallery-container">
                <div className="gallery-header">
                    <button onClick={() => setShowAllImg(false)} className="btn-back">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <h2>Photos of {place.title}</h2>
                </div>
                <div className="gallery-grid">
                    {place?.photos?.length > 0 && place.photos.map((photo, idx) => (
                        <div key={idx} className="gallery-item">
                            <Images src={photo} alt={`Photo ${idx + 1} of ${place.title}`} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="place-gallery">
            <div className="image-gallery">
                {place.photos?.[0] && (
                    <div className="main-image" onClick={() => setShowAllImg(true)}>
                        <Images src={place.photos[0]} style={{ width: "500px", height: "450px", borderRadius: "5px" }} alt={`Main photo of ${place.title}`} />
                    </div>
                )}
                <div className="side-images">
                    {place.photos?.[1] && (
                        <div className="side-image" onClick={() => setShowAllImg(true)}>
                            <Images src={place.photos[1]} style={{ width: "400px", height: "225px", borderRadius: "5px" }} alt={`Photo 2 of ${place.title}`} />
                        </div>
                    )}
                    {place.photos?.[2] && (
                        <div className="side-image" onClick={() => setShowAllImg(true)}>
                            <Images src={place.photos[2]} style={{ width: "400px", height: "225px", borderRadius: "5px" }} alt={`Photo 3 of ${place.title}`} />
                        </div>
                    )}
                </div>
            </div>
            <div className="show-all-button">
                <button onClick={() => setShowAllImg(true)} className="btn-show">
                    <FontAwesomeIcon icon={faEllipsisVertical} />&nbsp;&nbsp;Show all Images
                </button>
            </div>
        </div>
    );
}

PlaceGallery.propTypes = {
    place: PropTypes.shape({
        title: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default PlaceGallery;