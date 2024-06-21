import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDog, faDoorOpen, faRadio, faDumbbell, faSpa, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

function PerksLabel({ selected, onChange }) {

    function handleCheckbox(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(selectedName => selectedName !== name));
        }
    }

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
        <div className="container text-center">
            <div className="row row-cols-4 gap-1">
                {perkList.map(({ icon, label, key }) => (
                    <div className="col wrapper" key={key}>
                        <input 
                            type="checkbox" 
                            id={key} 
                            name={key} 
                            checked={selected.includes(key)} 
                            onChange={handleCheckbox} 
                        />
                        <FontAwesomeIcon icon={icon} />
                        <label htmlFor={key}>{label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

// PropTypes validation
PerksLabel.propTypes = {
    selected: PropTypes.array.isRequired, // Assuming 'selected' is an array of selected perk keys
    onChange: PropTypes.func.isRequired, // Assuming 'onChange' is a function to handle change in selected perks
};

export default PerksLabel;