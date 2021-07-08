import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import "./ModalContent.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "72%",
    background: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    marginTop: 90,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 3),
  },
}));

export default function ModalContent({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=22b7a82b91bdec936e76181ba1c46929&language=en-US`
    );
    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=22b7a82b91bdec936e76181ba1c46929`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div type="button" className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                  alt="PosterImage"
                  className="ContentModal_portrait"
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`}
                  alt="PosterImage"
                  className="ContentModal_landscape"
                />
                <div className="ContentModal_about">
                  <span cla="ContentModal_title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "...."
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal_description">
                    {content.overview}
                  </span>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
