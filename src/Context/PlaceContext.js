import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import axiosConnect from '../Token/axios.js';

export const PlaceContext = createContext({
  places: [],
  setPlaces: () => {},
  setLoading: () => {},
  loading: true
});

export const PlaceContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axiosConnect.get('/places');
        setPlaces(data.places);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places:', error);
        // Handle error state or notify users
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <PlaceContext.Provider value={{ places, setPlaces, setLoading, loading }}>
      {children}
    </PlaceContext.Provider>
  );
};

// PropTypes validation for the PlaceContextProvider component
PlaceContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a node and is required
};