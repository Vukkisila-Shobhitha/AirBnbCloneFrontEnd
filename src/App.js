import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './Context/UserContext.js';
import { PlaceContextProvider } from './Context/PlaceContext.js';
import FrontPage from './Routes/User/FrontPage.js';
import Dashboard from './Components/User/Dashboard.js';
import SignIn from './Routes/User/SignIn.js';
import SignUp from './Routes/User/SignUp.js';
import UserProfile from './Routes/User/UserProfile.js';
import Places from './Routes/Places/Places.js';
import PlaceInfo from './Routes/Places/PlaceInfo.js';
import AddNewPlace from './Routes/Places/AddNewPlace.js';
import Bookings from './Routes/Bookings/Bookings.js';
import BookingInfo from './Routes/Bookings/BookingInfo.js'; // Import BookingInfo component
import axiosConnect from './Token/axios.js';
import { getItemFromLS } from './Token/script.js';

function App() {
  const [bookingId, setBookingId] = useState(null); // Example state for bookingId

  useEffect(() => {
    // Fetch or set bookingId as needed
    setBookingId('example_booking_id'); // Replace with actual bookingId logic
  }, []);

  useEffect(() => {
    const token = getItemFromLS('token');
    if (token) {
      axiosConnect.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <UserContextProvider>
      <PlaceContextProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/frontpage" element={<FrontPage />} />
          <Route path="/userprofile" element={<UserProfile />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingInfo bookingId={bookingId} />} /> {/* Pass bookingId */}
            <Route path="places" element={<Places />}>
              <Route path="new" element={<AddNewPlace />} />
              <Route path=":id" element={<AddNewPlace />} />
            </Route>
          </Route>
          <Route path="/place/:id" element={<PlaceInfo />} />
        </Routes>
        <ToastContainer autoClose={3000} transition={Slide} />
      </PlaceContextProvider>
    </UserContextProvider>
  );
}

export default App;