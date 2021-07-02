import React from "react";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";

const img_300 = "https://image.tmdb.org/t/p/w300";

function SingleContent({ id, poster, title, date, media_type, vote }) {
  return (
    <div className="media">
      <Badge badgeContent={vote} color={vote > 7 ? "primary" : "secondary"} />
      <img className="poster" src={`${img_300}/${poster}`} alt="PosterImage" />
      <b className="title">{title} </b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}{" "}
        <span className="subTitle">{date} </span>
      </span>
    </div>
  );
}

export default SingleContent;
