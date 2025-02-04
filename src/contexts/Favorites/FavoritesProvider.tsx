import React, { createContext, useState, useEffect, useCallback } from "react";

export interface FavoritesContextType {
  favorites: number[];
  isInitialized: boolean;
  toggleFavorite: (id: number) => void;
  checkIfFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isInitialized: false,
  toggleFavorite: () => {},
  checkIfFavorite: () => false,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load favorites from localStorage on init
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever favorites change, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  }, []);

  const checkIfFavorite = useCallback(
    (id: number) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isInitialized, toggleFavorite, checkIfFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
