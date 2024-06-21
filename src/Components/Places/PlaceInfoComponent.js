import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import axiosConnect from '../../Token/axios.js';
import Spinner from '../Spinner/Spinner.js';
import PlaceGallery from './PlaceGallery.js';
import Address from './Address.js';

function PlaceInfoComponent({ id }) {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        setLoading(true);

        const getPlace = async () => {
            try {
                const { data } = await axiosConnect.get(`/places/${id}`);
                setPlace(data.place);
            } catch (error) {
                console.error('Error fetching place data:', error);
            } finally {
                setLoading(false);
            }
        };

        getPlace();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!place) {
        return <div>No place information available</div>;
    }

    return (
        <div className="pad-mar">
            <span className="info-page">
                <h4 style={{ textDecoration: "none" }}>{place.title}</h4>
            </span>

            <div>
                <Address placeAddress={place.address} />
            </div>

            <PlaceGallery place={place} />
        </div>
    );
}

// PropTypes validation for PlaceInfoComponent
PlaceInfoComponent.propTypes = {
    id: PropTypes.string.isRequired, // Validate that id is a string and is required
};

export default PlaceInfoComponent;