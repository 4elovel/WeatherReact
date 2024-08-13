import { Settings } from "../types";

type Action =
  | { type: "SET_CITY"; payload: string }
  | {
      type: "SET_COLORS";
      payload: { textColor: string; backgroundColor: string };
    };

export const settingsReducer = (state: Settings, action: Action): Settings => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, favoriteCity: action.payload };
    case "SET_COLORS":
      return {
        ...state,
        textColor: action.payload.textColor,
        backgroundColor: action.payload.backgroundColor,
      };
    default:
      return state;
  }
};
