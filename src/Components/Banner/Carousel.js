import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { SpotifyState } from "../../SpotifyContext";
import AliceCarousel from "react-alice-carousel";
import { makeStyles } from "@material-ui/core";
import "react-alice-carousel/lib/alice-carousel.css";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "gold",
  },
}));
const Carousel = () => {
  const classes = useStyles();
  const [cData, setCData] = useState();
  const s = new SpotifyWebApi();
  const { token } = SpotifyState();

  useEffect(() => {
    s.setAccessToken(token);
    s.getPlaylist("37i9dQZEVXbLRQDuF5jeBp").then((response) => {
      setCData(response);
    });
  }, [token]);

  console.log(cData);

  const items =
    cData !== undefined
      ? cData.tracks.items.map((item) => {
          return (
            <div className={classes.carouselItem}>
              <img
                src={item?.track.album.images[2].url}
                alt={item?.track.album.name}
                height="80"
                style={{ marginBottom: 10 }}
              />

              <span style={{ fontSize: 15, fontWeight: 500 }}>
                {item.track.name}
              </span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>
                By: {item.track.artists[0].name}
              </span>
            </div>
          );
        })
      : console.log("error mapping");

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 3,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={500}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
