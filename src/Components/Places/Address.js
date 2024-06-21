//import React from 'react';
import PropTypes from 'prop-types';

function Address({ placeAddress }) {
    return (
        <div className="address">
            <p>{placeAddress}</p>
        </div>
    );
}

Address.propTypes = {
    placeAddress: PropTypes.string.isRequired,
};

export default Address;