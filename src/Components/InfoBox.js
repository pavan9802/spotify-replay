import React from "react";
import { Card, CardContent } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { SpotifyState } from "../SpotifyContext";
import "./InfoBox.css";


function InfoBox() {

  const { type, data } = SpotifyState();

  return (
    <Fade delay={300}>
      <div>
        {data.items !== undefined
          ? data.items.map((item, index) => (
              <a
                href={
                  type !== "recently_played"
                    ? item.external_urls
                      ? item.external_urls.spotify
                      : console.log("error getting url")
                    : item.track
                    ? item.track.external_urls.spotify
                    : console.log("error getting url")
                }
              >
                <Card className="info_box">
                  <CardContent>
                    <div className="row">
                      <div className="num">
                        <p> {index + 1 + ". "}</p>
                      </div>

                      <div className="picture">
                        <img
                          src={
                            type === "artists"
                              ? item.images
                                ? item.images[2].url
                                : console.log("error InfoBox images")
                              : type === "tracks"
                              ? item.album
                                ? item.album.images[2].url
                                : console.log("error InfoBox images")
                              : item.track
                              ? item.track.album.images[2].url
                              : console.log("error InfoBox images")
                          }
                          alt="Loading"
                          height="75px"
                          width="75px"
                        />
                      </div>

                      <div className="info">
                        <div className="name">
                          <h4>
                            {type !== "recently_played"
                              ? item.name
                              : item.track
                              ? item.track.name
                              : console.log("error getting name")}
                          </h4>
                        </div>

                        <div className="rest">
                          <p>
                            {type === "artists"
                              ? item.genres
                              : type === "tracks"
                              ? item.artists
                                ? item.artists[0].name
                                : console.log("error geting artists")
                              : item.track
                              ? item.track.artists[0].name
                              : console.log("error geting artists")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          : console.log("")}
      </div>
    </Fade>
  );
}

export default InfoBox;
