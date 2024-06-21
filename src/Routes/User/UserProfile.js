import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLeftLong } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../Context/UserContext.js';
import Places from '../Places/Places.js';
import { removeItemFromLS } from '../../Token/script.js';

function UserProfile() {
    const { user, signout } = React.useContext(UserContext);
    const navigate = useNavigate();
    const { subpage } = useParams();

    const handlesignout = async () => {
        try {
            await signout();
            removeItemFromLS('token');
            toast.success('Signed out successfully');
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('Failed to sign out');
        }
    };

    if (!user) {
        navigate('/signin'); // Redirect to sign-in if user not authenticated
        return null; // Optional, depends on your app structure
    }

    return (
        <div>
            <nav className="comp-section-div">
                <Link to={"/userprofile"} className={`link-switch comp-section ${subpage === 'userprofile' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile
                </Link>
                <Link to={"/userprofile/bookings"} className={`link-switch comp-section ${subpage === 'bookings' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings
                </Link>
                <Link to={"/userprofile/places"} className={`link-switch comp-section ${subpage === 'places' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places
                </Link>
            </nav>

            <div className="App pad-mar">
                <Link to={"/"} className="link-switch comp-section">
                    <FontAwesomeIcon icon={faLeftLong} />&nbsp;&nbsp;Back To Home
                </Link>
            </div>

            {subpage === 'userprofile' && (
                <div className="App heading-accountpg">
                    <div><span className="bold-cls">UserName: </span>{user.username}</div>
                    <div><span className="bold-cls">Email: </span>{user.email}</div>
                    <div>
                        <button className="btn-sign pad-mar" onClick={handlesignout}>Sign Out</button>
                    </div>
                </div>
            )}

            {subpage === 'places' && (
                <Places />
            )}
        </div>
    );
}

export default UserProfile;