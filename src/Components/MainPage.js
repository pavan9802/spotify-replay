import React, {useEffect } from "react";
import Panel from "./Panel";
import { SpotifyState } from "../SpotifyContext";
import Header from "./Header";
import Banner from "./Banner/Banner";
import Alert from "./Alert";
import { makeStyles} from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
  middle: {
    display:'flex',
    flexDirection:'column',
    alignItems:"center",
   
    marginTop: 25
 
  },
}));

function MainPage() {
  // const [type, setType] = useState("artists");
  const {token, setAlert, } = SpotifyState();
  const classes = useStyles();    
 useEffect(() => {
  if(token){
    
    setAlert({
      open: true,
      message: "Login Successful",
      type: "success",
    })

  }
 }, [])
  
  return (
    <>
    
    <Header/>
    <Banner/>
    
    <div className = {classes.middle}>
      <Panel/> 
    </div>
   
    <Alert></Alert>
    </>
  );
}

export default MainPage;
