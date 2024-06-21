import { useContext } from 'react';
import Header from '../Header/Header.js';
import FrontPage from '../../Routes/User/FrontPage.js';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import { removeItemFromLS } from '../../Token/script.js';
import { toast } from 'react-toastify';

function Dashboard() {
    const { user, signout } = useContext(UserContext);

    const handleSignout = async () => {
        try {
            await signout();
            removeItemFromLS('token');
            toast.success('Signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className="p-3">
            <Header />
            <div>
                <FrontPage />
            </div>

            {user ? (
                <div className="App">
                    <button className="btn-sign pad-mar" onClick={handleSignout}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="App pad-mar">
                    <Link to="/signin" className="link-switch comp-section btn-sign">
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Dashboard;