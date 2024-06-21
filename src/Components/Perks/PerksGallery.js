import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDog, faDoorOpen, faRadio, faDumbbell, faSpa, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

function PerksGallery({ perks }) {
    const perkList = [
        { icon: faWifi, label: 'Wifi', key: 'wifi' },
        { icon: faTv, label: 'TV', key: 'tv' },
        { icon: faCarSide, label: 'Free Parking Spot', key: 'freeparkingspot' },
        { icon: faRadio, label: 'Radio', key: 'radio' },
        { icon: faDog, label: 'Pets', key: 'pets' },
        { icon: faMotorcycle, label: 'Bike Rental', key: 'bike' },
        { icon: faSpa, label: 'Spa Day', key: 'spa' },
        { icon: faDumbbell, label: 'Gym', key: 'gym' },
        { icon: faDoorOpen, label: 'Private Entrance', key: 'entrance' },
    ];

    return (
        <div>
            <hr />
            <h5 className="bold-cls">What this place offers</h5>
            <div>
                {perkList.map(({ icon, label, key }) => (
                    <div key={key}>
                        <FontAwesomeIcon icon={icon} />
                        <label htmlFor={key} className={perks?.includes(key) ? '' : 'strike-out'}>
                            &nbsp;&nbsp;{label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

// PropTypes validation
PerksGallery.propTypes = {
    perks: PropTypes.array.isRequired, // Assuming 'perks' is an array of keys ('wifi', 'tv', etc.)
};

export default PerksGallery;