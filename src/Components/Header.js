import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import BrushIcon from "@mui/icons-material/Brush";
import { makeStyles } from "@material-ui/core/styles";
import { SpotifyState } from "../SpotifyContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  appbar: {
    background: "gold",
  },
  bottomNav: {
    // backgroundColor:'transparent',
    color: "gold",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { type, setType } = SpotifyState();

  const handleChange = (event, newValue) => {
    setType(newValue);
  };

  return (
    <AppBar className={classes.appbar} position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* Spotify */}
          </Typography>

          <Box sx={{ width: 500 }}>
            <BottomNavigation
              style={{ backgroundColor: "transparent", fontSize: 300 }}
              textColor={classes.bottomNav}
              // showLabels
              value={type}
              onChange={handleChange}
            >
              <BottomNavigationAction
                value="artists"
                label="Artists"
                icon={<BrushIcon />}
              />
              <BottomNavigationAction
                value="tracks"
                label="Tracks"
                icon={<AudiotrackIcon />}
              />
              <BottomNavigationAction
                value="recently_played"
                label="Recently Played"
                icon={<RestoreIcon />}
              />
            </BottomNavigation>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
