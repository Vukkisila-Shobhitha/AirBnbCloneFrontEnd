import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import axiosConnect from '../../Token/axios.js';
import Spinner from '../Spinner/Spinner.js';

function PlaceImageComponent({ id, className = '' }) {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        const fetchPlace = async () => {
            try {
                const { data } = await axiosConnect.get(`/places/${id}`);
                setPlace(data.place);
            } catch (error) {
                console.error('Error fetching place data:', error);
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
        return null;
    }

    return (
        <div className={`pad-mar ${className}`}>
            <div className="info-page">
                <img
                    className="card-img-top card-img col-md-4"
                    src={place.photos[0]}
                    alt={`${place.title} Image`}
                    style={{ width: "120px", height: "120px" }}
                />
                <h4 style={{ textDecoration: "none" }}>{place.title}</h4>
                <p>{place.address}</p>
            </div>
        </div>
    );
}

// PropTypes validation for PlaceImageComponent
PlaceImageComponent.propTypes = {
    id: PropTypes.string.isRequired, // Validate that id is a string and is required
    className: PropTypes.string, // className is optional and should be a string
};

export default PlaceImageComponent;