import { createContext, useContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (job) => {
    setFavorites((prevFavorites) => [...prevFavorites, job]);
  }

  const removeFavorite = (jobId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(job => job.id !== jobId));
  }
  const isFavorite = (jobId) => {
    return favorites.some(job => job.id === jobId);
  }
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext value={value}>
      {children}
    </FavoritesContext>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');

  return context;
}
