import { createContext } from 'react';

const ListingsContext = createContext({
    listings: [],
    setListings: () => {},
    resetListings: () => {},
})

export default ListingsContext;
