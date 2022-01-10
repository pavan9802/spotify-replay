import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SpotifyWebApi from "spotify-web-api-js";
import InfoBox from "./InfoBox";
import {Typography } from "@material-ui/core";
import { makeStyles } from '@mui/styles';

import "./Panel.css";
import { yellow } from "@mui/material/colors";


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
    color:'yellow',
    margin: '0',
    borderRadius: '30px'
    
  }}
);
export default function Panel({ token, type }) {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
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
      <div className={type === "artists" ? "artists" : "tracks"}>
        <div>
          <h1 className="text">
            {type === "artists" ? "Your Top Artists" : "Your Top Tracks"}
          </h1>
        </div>
      </div>

      <div className="panel_container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{color:yellow , borderBottom: 0}}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              className={classes.root}
              aria-label="basic tabs example"
              sx = {{margin:500  }}
              // textColor="secondary"
              // indicatorColor="secondary"
              
            >
              <Tab  label="All Time" {...a11yProps(0)} />
              <Tab label="Last 6 Months" {...a11yProps(1)} />
              <Tab label="Last 4 Weeks" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {data === null ? (
              console.log("here")
            ) : (
              <InfoBox type={type} data={data} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {data === null ? (
              console.log("here")
            ) : (
              <InfoBox type={type} data={data} />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {data === null ? (
              console.log("here")
            ) : (
              <InfoBox type={type} data={data} />
            )}
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
