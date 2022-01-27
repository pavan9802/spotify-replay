import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { SpotifyState } from "../SpotifyContext";
import Header from "./Header";
import Banner from "./Banner/Banner";
import Alert from "./Alert";
import { makeStyles } from "@material-ui/core/styles";
import SpotifyWebApi from "spotify-web-api-js";
import RecButton from "./RecButton";
const useStyles = makeStyles((theme) => ({
  middle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent:"center",
    marginTop: 25,
  },
}));

function MainPage() {
  
  const { token, setAlert, setProfilePic, username, setUsername } = SpotifyState();
  const classes = useStyles();
  const s = new SpotifyWebApi();
  

  useEffect(() => {
    s.setAccessToken(token);
    if (token) {
    
      s.getMe().then(
        (response) => {
          console.log(response)
          response.id ? setUsername(response.id) : console.log("error getting display name")
          response.images ? setProfilePic(response.images[0].url) : console.log("error getting profile pic")
          
        
        }
      );
       
      setAlert({
        open: true,
        message: "Welcome",
        type: "success",
      });
    }
  }, []);

  return (
    <>
      <Header/>
      <Banner/>

      <div className={classes.middle}>
        <Panel/>
        {/* <RecButton/> */}
      </div>

      <Alert/>
    </>
  );
}

export default MainPage;
