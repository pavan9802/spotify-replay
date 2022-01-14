import React, { useState } from "react";
 
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Panel from "./Panel";
import "./MainPage.css";


function MainPage({ token }) {
  const [type, setType] = useState("artists");

 
  function changeType(type){
     
    setType(type);
  }
 

  return (
    <div className="container">
      <div className="left">
        
        <ToggleButtonGroup
        >
            <div className="buttons">
            <a className="btn" href="https://www.spotify.com/">
                <img
                src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-green-logo-8.png"
                // src="https://pngset.com/images/listen-to-the-music-listen-music-icon-and-vector-for-free-text-sunglasses-accessories-accessory-transparent-png-1976862.png"
                height="50px"
                width="50px"
                
                >
                </img>
            </a>
            <button className = "btn" onClick={()=>changeType('artists')} >Artists</button>
            <button className = "btn" onClick={()=>changeType('tracks')}>Tracks</button>
            </div>
        </ToggleButtonGroup>
        
      </div>

      <div className="mid">
          <Panel
           token = {token}
           type = {type}
          ></Panel>
       
      </div>

      <div className="right"></div>
    </div>
  );
}

export default MainPage;
