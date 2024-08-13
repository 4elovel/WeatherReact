// src/components/Settings.tsx
import React, { useReducer, useEffect } from "react";
import { settingsReducer } from "../reducers/settingsReducer";

const initialSettings = {
  favoriteCity: "",
  textColor: "#000000",
  backgroundColor: "#ffffff",
};
interface Props {
  children: React.ReactNode;
}

const Settings: React.FC<Props> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");
    if (savedSettings) {
      dispatch({ type: "SET_CITY", payload: savedSettings.favoriteCity });
      dispatch({
        type: "SET_COLORS",
        payload: {
          textColor: savedSettings.textColor,
          backgroundColor: savedSettings.backgroundColor,
        },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <div
      style={{
        color: settings.textColor,
        backgroundColor: settings.backgroundColor,
        height: "100vh",
        width: "100vw",
      }}
    >
      <h3>Settings</h3>
      <label>
        Favorite City:
        <input
          type="text"
          value={settings.favoriteCity}
          onChange={(e) =>
            dispatch({ type: "SET_CITY", payload: e.target.value })
          }
        />
      </label>
      <label>
        Text Color:
        <input
          type="color"
          value={settings.textColor}
          onChange={(e) =>
            dispatch({
              type: "SET_COLORS",
              payload: {
                textColor: e.target.value,
                backgroundColor: settings.backgroundColor,
              },
            })
          }
        />
      </label>
      <label>
        Background Color:
        <input
          type="color"
          value={settings.backgroundColor}
          onChange={(e) =>
            dispatch({
              type: "SET_COLORS",
              payload: {
                textColor: settings.textColor,
                backgroundColor: e.target.value,
              },
            })
          }
        />
      </label>
      {children}
    </div>
  );
};

export default Settings;
