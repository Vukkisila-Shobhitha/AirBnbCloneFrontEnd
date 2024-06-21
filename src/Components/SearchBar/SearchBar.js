import { useContext, useState } from "react";
import { PlaceContext } from "../../Context/PlaceContext.js";
import axiosConnect from "../../Token/axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [placeSearch, setPlaceSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setPlaces, setLoading } = useContext(PlaceContext);

  const handleSearch = (searchTerm, setSearchTerm, searchType) => {
    clearTimeout(searchTimeout);
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosConnect.get(
            `/places/search${searchType}/${searchTerm.trim()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };

  return (
    <div>
      <div className="header-nav App shadow">
        <input
          type="text"
          className="form-control header-inp-bar"
          placeholder="Anywhere"
          value={placeSearch}
          onChange={(e) => handleSearch(e.target.value, setPlaceSearch, "")}
        />
        <div className="vr vr-line ver-line"></div>
        <input
          type="text"
          className="form-control header-inp-bar"
          placeholder="Any Hotel"
          value={hotelSearch}
          onChange={(e) => handleSearch(e.target.value, setHotelSearch, "hotel")}
        />
        <div className="vr vr-line ver-line"></div>
        <label>Add Guests</label>
        <button className="btn-search" onClick={() => handleSearch(placeSearch, setPlaceSearch, "")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;