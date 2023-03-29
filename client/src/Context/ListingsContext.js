import { createContext } from 'react';

const ListingsContext = createContext({
    listings: [],
    setListings: () => {},
    resetListings: () => {},
    hasMoreListings: true,
    setHasMoreListings: () => {},
})

export default ListingsContext;
