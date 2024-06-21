//import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity } from '@fortawesome/free-solid-svg-icons';

function UserProfileNav() {
    const { pathname } = useLocation();
    let subpage = pathname.split('/')[2];

    if (subpage === undefined) {
        subpage = 'profile'; // Default to 'profile' if subpage is undefined
    }

    return (
        <div>
            <nav className="comp-section-div">
                <Link to="/userprofile" className={`link-switch comp-section ${subpage === 'profile' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile
                </Link>
                <Link to="/userprofile/bookings" className={`link-switch comp-section ${subpage === 'bookings' ? 'active' : 'comp-section-disable'}`}>
                    <FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings
                </Link>
                <Link to="/userprofile/places" className={`link-switch comp-section ${subpage === 'places' ? 'active' : 'comp-section-disable'}`}>
                    <FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places
                </Link>
            </nav>
        </div>
    );
}

export default UserProfileNav;
