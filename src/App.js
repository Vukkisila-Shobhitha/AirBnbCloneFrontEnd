import { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
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
import BookingInfo from './Routes/Bookings/BookingInfo.js';
import axiosConnect from './Token/axios.js';
import { getItemFromLS } from './Token/script.js';
import './App.css';

function App() {
  //const { user } = useContext(UserContext);

  useEffect(() => {
    const token = getItemFromLS('token');
    if (token) {
      axiosConnect.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
/*
  return (
    <Router>
      <UserContextProvider>
        <PlaceContextProvider>
          <Routes>
            <Route path="/" element={ <Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/frontpage" element={<FrontPage />} />
            {user ? (
              <Route element={<AuthenticatedRoutes />} />
            ) : (
              <Route path="*" element={<Navigate to="/signin" />} />
            )}
          </Routes>
          <ToastContainer autoClose={3000} transition={Slide} />
        </PlaceContextProvider>
      </UserContextProvider>
    </Router>
  );
}

function AuthenticatedRoutes() {
  return (
    <>
      <Route path="/userprofile" element={<UserProfile />}>
        <Route index element={<Navigate to="places" />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:id" element={<BookingInfo />} />
        <Route path="places" element={<Places />}>
          <Route path="new" element={<AddNewPlace />} />
          <Route path=":id" element={<AddNewPlace />} />
        </Route>
      </Route>
      <Route path="/place/:id" element={<PlaceInfo />} />
    </>
  );*/

  return (
    <Router>
    <UserContextProvider>     
    <PlaceContextProvider>  
        <Routes>
            <Route exact path="/" element={<Dashboard />}> </Route>
            <Route path="/frontpage" element={<FrontPage />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/userprofile/bookings" element={<Bookings />}></Route>
            <Route path="/userprofile/bookings/:id" element={<BookingInfo />}></Route>
            <Route path="/userprofile/places" element={<Places />}></Route>
            <Route path="/userprofile/places/new" element={<AddNewPlace />}></Route>
            <Route path="/userprofile/places/:id" element={<AddNewPlace />}></Route>
            <Route path="/place/:id" element={<PlaceInfo />}></Route>
            <Route path="/" element={<Navigate replace to="/signin" />} />
          
        </Routes>
        <ToastContainer autoClose={3000} transition={Slide} />
    </PlaceContextProvider>
    </UserContextProvider>
    </Router>
  );
}

export default App;

