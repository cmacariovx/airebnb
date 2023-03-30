import { createContext } from 'react';

const ListingsContext = createContext({
    listings: [],
    setListings: () => {},
    resetListings: () => {},
    hasMoreListings: true,
    setHasMoreListings: () => {},
    showMediaSearch: false,
    setShowMediaSearch: () => {}
})

export default ListingsContext;
