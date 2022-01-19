import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SpotifyWebApi from "spotify-web-api-js";
import InfoBox from "./InfoBox";
import { Typography } from "@material-ui/core";
import { SpotifyState } from "../SpotifyContext";
import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const s = new SpotifyWebApi();

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    color: "gold",
    fontWeight: "bolder",
    fontSize: 200,
  },
  tab: {
    fontSize: 500,
    // fontWeight: "bold" ,
    marginRight: "400px",
  },
  panel_container: {
    display: "flex",
    marginLeft: 500,
  },
});

export default function Panel() {
  const [value, setValue] = useState(0);

  const { token, type, data, setData } = SpotifyState();

  const classes = useStyles();

  function fetchData(time_range) {
    if (time_range === 0) {
      time_range = "long_term";
    }
    if (time_range === 1) {
      time_range = "medium_term";
    }
    if (time_range === 2) {
      time_range = "short_term";
    }
    if (type === "artists") {
      s.getMyTopArtists({ time_range: time_range }).then((response) =>
        setData(response)
      );
    }
    if (type === "tracks") {
      s.getMyTopTracks({ time_range: time_range }).then((response) =>
        setData(response)
      );
    }
    if (type === "recently_played") {
      s.getMyRecentlyPlayedTracks({ tlimit: 20 }).then(
        (response) => setData(response)
        //  console.log(response)
      );
    }
  }

  useEffect(() => {
    s.setAccessToken(token);
    setValue(0);
    fetchData("long_term");
  }, [type]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchData(newValue);
  };

  return (
    <>
      {type !== "recently_played" ? (
        <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 0 }}>
              <Tabs
                centered
                value={value}
                onChange={handleChange}
                className={classes.root}
                aria-label="basic tabs example"
                textColor={classes.root}
              >
                <Tab
                  className={classes.tab}
                  label="All Time"
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tab}
                  label="Last 6 Months"
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.tab}
                  label="Last 4 Weeks"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {data === null ? (
                console.log("here")
              ) : (
                <Container fixed>
                  <InfoBox />
                </Container>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {data === null ? console.log("here") : <InfoBox />}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {data === null ? console.log("here") : <InfoBox />}
            </TabPanel>
          </Box>
        </div>
      ) : (
        <InfoBox />
      )}
    </>
  );
}
