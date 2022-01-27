import React, { createContext, useContext, useState } from "react";

const Spotify = createContext();

const SpotifyContext = ({ children }) => {
  const [type, setType] = useState("artists");
  const [profilePic, setProfilePic] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [username, setUsername] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [s, setS] = useState({});

  return (
    <Spotify.Provider
      value={{
        type,
        setType,
        token,
        setToken,
        data,
        setData,
        alert,
        setAlert,
        s,
        setS,
        profilePic,
        setProfilePic,
        username, 
        setUsername
       
      }}
    >
      {children}
    </Spotify.Provider>
  );
};

export default SpotifyContext;

export const SpotifyState = () => {
  return useContext(Spotify);
};
