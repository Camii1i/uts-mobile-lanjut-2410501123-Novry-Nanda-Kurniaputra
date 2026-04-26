import { createContext, useReducer } from "react";

export const FavoritesContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const exist = state.favorites.find(
        (item) => item.idMeal === action.payload.idMeal
      );

      if (exist) {
        return state;
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.idMeal !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}