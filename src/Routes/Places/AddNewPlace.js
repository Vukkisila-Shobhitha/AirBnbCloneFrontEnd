import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity } from '@fortawesome/free-solid-svg-icons';

import PerksLabel from '../../Components/Perks/PerksLabel.js';
//import UserProfileNav from '../../Components/User/UserProfileNav.js';
import ImagesUploader from '../../Components/Images/ImagesUploader.js';
import Spinner from '../../Components/Spinner/Spinner.js';
import axiosConnect from '../../Token/axios.js';

function AddNewPlace() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(1500);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosConnect.get(`/places/${id}`)
                .then((response) => {
                    const { place } = response.data;
                    setTitle(place.title);
                    setAddress(place.address);
                    setAddedPhotos(place.photos);
                    setDescription(place.description);
                    setPerks(place.perks);
                    setExtraInfo(place.extraInfo);
                    setCheckIn(place.checkIn);
                    setCheckOut(place.checkOut);
                    setMaxGuests(place.maxGuests);
                    setPrice(place.price);
                })
                .catch((error) => {
                    console.error('Error fetching place:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleInputChange = (setStateFn) => (e) => {
        setStateFn(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        try {
            setLoading(true);
            if (id) {
                await axiosConnect.put('/places/update-place', { id, ...placeData });
            } else {
                await axiosConnect.post('/places/add-places', placeData);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error saving place:', error);
        } finally {
            setLoading(false);
        }
    }

    if (redirect) {
        return <Navigate to={'/userprofile/places'} />;
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <nav className="comp-section-div">
                <Link to={"/userprofile"} className="link-switch comp-section-disable">
                    <FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile
                </Link>
                <Link to={"/userprofile/bookings"} className="link-switch comp-section-disable">
                    <FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings
                </Link>
                <Link to={"/userprofile/places"} className="link-switch comp-section">
                    <FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places
                </Link>
            </nav>
            <h4 className="App pad-mar">Add New Place</h4>
            <div className="main-card-style">
                <form className="px-4 py-3" onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Title</label>
                        <p className="font-min">Title for your place, should be short and catchy as in advertisement</p>
                        <input type="text" className="form-control inp-bar" placeholder="Title, e.g., My Lovely Apartment" value={title} onChange={handleInputChange(setTitle)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Address</label>
                        <p className="font-min">Address to this place</p>
                        <input type="text" className="form-control inp-bar" placeholder="Address" value={address} onChange={handleInputChange(setAddress)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Photos</label>
                        <p className="font-min">More equals better</p>
                        <ImagesUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">About this space</label>
                        <p className="font-min">Description about the Place</p>
                        <textarea className="form-control" placeholder="Describe about place" style={{ height: "100px" }} value={description} onChange={handleInputChange(setDescription)}></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Perks</label>
                        <p className="font-min">Select all the Perks</p>
                        <PerksLabel selected={perks} onChange={setPerks} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Extra Info</label>
                        <p className="font-min">About House rules, etc.</p>
                        <textarea className="form-control" style={{ height: "70px" }} value={extraInfo} onChange={handleInputChange(setExtraInfo)}></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Check-In | Check-Out | Max Guests</label>
                        <p className="font-min">Update check-in, check-out times & maximum guests</p>
                        <div className="container text-center">
                            <div className="row row-cols-4 gap-1">
                                <div className="col">
                                    <label className="bold-cls-sm">Check-In</label>
                                    <input type="text" className="form-control inp-bar-sm" placeholder="15:00" value={checkIn} onChange={handleInputChange(setCheckIn)} />
                                </div>
                                <div className="col">
                                    <label className="bold-cls-sm">Check-Out</label>
                                    <input type="text" className="form-control inp-bar-sm" placeholder="23:00" value={checkOut} onChange={handleInputChange(setCheckOut)} />
                                </div>
                                <div className="col">
                                    <label className="bold-cls-sm">Max Guests</label>
                                    <input type="number" className="form-control inp-bar-sm" placeholder="e.g., 5" value={maxGuests} onChange={handleInputChange(setMaxGuests)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label bold-cls">Price</label>
                        <p className="font-min">Price Per Night</p>
                        <input type="number" className="form-control inp-bar" value={price} onChange={handleInputChange(setPrice)} />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="form-control comp-section">Save Details</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddNewPlace;