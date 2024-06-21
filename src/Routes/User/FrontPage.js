import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

import Images from '../../Components/Images/Images.js';
import { PlaceContext } from '../../Context/PlaceContext.js';
import Spinner from '../../Components/Spinner/Spinner.js';

function FrontPage() {
    const { places, loading } = useContext(PlaceContext);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="card-main-container container m-5">
            <div className="row">
                {places.length > 0 ? (
                    places.map(place => (
                        <div className="card-box m-2 col" key={place._id}>
                            <div className="">
                                <Link to={`/place/${place._id}`} className="card-txt">
                                    <div className="card-main card-img-place container-img">
                                        {place.photos?.[0] && (
                                            <Images className="" style={{ width: "300px", height: "300px", borderRadius: "10px" }} src={place.photos?.[0]} alt="" />
                                        )}
                                    </div>
                                    <div className="card-content">
                                        <h6 className="card-address">{place.address}</h6>
                                        <p className="card-title">{place.title}</p>
                                        <div className="">
                                            <span className="card-price">₹ {place.price}</span><span className="card-title"> per night</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <h1 className="my-4">No places found!</h1>
                        <p className="mb-4">
                            Sorry, we couldn&apos;t find any places matching your criteria.
                        </p>
                        <div className="App pad-mar">
                            <Link to={"/"} className="link-switch comp-section">
                                <FontAwesomeIcon icon={faHandPointLeft} />&nbsp;&nbsp;Go Back to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FrontPage;