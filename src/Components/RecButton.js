import React, {useState, useEffect} from 'react'
import { Card, CardContent } from "@material-ui/core";
import { SpotifyState } from "../SpotifyContext";
import Typography from "@mui/material/Typography";
import SpotifyWebApi from "spotify-web-api-js";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import "./RecButton.css"


const useStyles = makeStyles({
    root: {
      backgroundColor: "transparent",
      color: "gold",
      fontWeight: "bolder",
      fontSize: 200,
    }
  });

export default function RecButton() {
    const [seedArray, setSeedArray] = useState([]);
    const [trackIdArray, setTrackIdArray] = useState([]);
    const [playlistID, setPlaylistID] = useState();
    const {token, type, data, username, setAlert} = SpotifyState();


    const classes = useStyles();
    const s = new SpotifyWebApi();
    let titleText = "";
    let subText = "";

    if(type === 'recently_played'){
        titleText = 'Create a playlist based on your recently played tracks.' 
        subText = "This will create a playlist based on your 5 most recently played tracks.";
    }else {
        titleText = 'Create a playlist based on your top ' + type + ".";
        subText = "This will create a playlist based on your top 5 " + type +".";
    }

    useEffect(() => {
         s.setAccessToken(token);
        
       
    }, [data]);

   // Creates the array for the seeds needed to get recomended tracks
    const createSeedArray = () => {
        let tempArr = [];
        if(type === 'recently_played'){
            for(let i = 0; i < 5; i++){
                data.items?tempArr.push(data.items[i].track.id): console.log("error creating array"); 
            }
        }else{
            for(let i = 0; i < 5; i++){
                data.items?tempArr.push(data.items[i].id): console.log("error creating array"); 
            }
        }
        setSeedArray(tempArr);
     
        // console.log(tempArr);
    }

    // Creates the array for the tracks to be added to the playlist;
    const createTrackIdArray = (response) => {
        let tempArr = []
        // console.log(response.tracks);

        response.tracks.map((item)=>{
            tempArr.push("spotify:track:"+item.id);
        })
        setTrackIdArray(tempArr);
        // console.log(trackIdArray);
    }

    const getRecs = () =>{
        if(type ==="artists"){

            s.getRecommendations({
                min_energy: 0.4,
                seed_artists: seedArray,
                min_popularity: 50
              })
            .then(function(response) {
                console.log(response);
                createTrackIdArray(response);
            }, function(err) {
              console.log("Something went wrong!", err);
            });

        }else{
            s.getRecommendations({
                seed_tracks: seedArray
              })
              .then((response) =>{
                console.log(response);
                createTrackIdArray(response);
              })
        }
    }

    const addSongsToPlaylist = () =>{
        s.addTracksToPlaylist(playlistID, trackIdArray)
        .then(function(response) {
            console.log(response);

        },function(err) {
            console.error(err);
        }
        
        );
    }

    const createPlaylist = () =>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDay();

        s.createPlaylist(username, {
            "name": "Spotify Web App playlist - " + date ,
            "description": "New Playlist based on your top " + type,
            "public": false
          })
        .then(function(response) {
            // console.log(response);

            setAlert({
                open: true,
                message: "Playlist Created!",
                type: "success",
            });
            setPlaylistID(response.id);
            console.log(response.id);
            createSeedArray();
            getRecs();
            addSongsToPlaylist();

        },function(err) {
            console.error(err);
        }
        
        );
        
    }

    return (
        <Fade delay={300}>
            <Card className= "rec_box">
                  <CardContent>
                    <div className='box_container'> 
                        <div className='container_left'>
                            <Typography id="modal-modal-title" variant="h8" component="h3">
                                {titleText}
                            </Typography>
                            <Typography id="modal-modal-description"  sx={{ mt: 2}} >
                                {subText}
                            </Typography>

                        </div>

                        <div className='container_right'>
                            <button className='btn' onClick= {createPlaylist}>Create Playlist</button>

                        </div>
                    </div>

                  </CardContent>
            </Card>
            </Fade>
      
    )
}
