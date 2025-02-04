import { useContext } from "react";
import { FavoritesContext, FavoritesContextType } from "./FavoritesProvider";

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  return {
    ...context,
  };
};
