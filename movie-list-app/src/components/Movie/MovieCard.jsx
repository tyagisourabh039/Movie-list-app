import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, styled, useMediaQuery } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getGenre } from "../../api/movie";
// styled Overlay component for toggling the information card, clicking anywhere on the screen
const Overlay = styled("div")(({ theme }) => ({
  position: "fixed",
  opacity: "1",
  background: "transparent black",
  zIndex: "1",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // breakpoints for the responsive web application
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sx")]: {
    flexDirection: "row",
  },
}));

export default function MovieCard({
  id,
  title,
  imagePath,
  description,
  movieGenres,
  genresList,
  rating,
}) {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const cardRef = useRef(null);
  // using useMediaQuery breakpoints for the responsibe web application
  const mobile = useMediaQuery("(min-width:500px)");
  // toggling the state of movie info card
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  // when page loads to the browser this useffect will run, inside it is fetching
  // all genre list from server, as it is getting only genre ids from movies list movie
  //  and movie card info needs genre name to show in the movie info card for that it is comparing id
  //  to the allGenres if it finds, it adds to the genre state.

  useEffect(() => {
    setGenres(genresList.filter((genre) => movieGenres.includes(genre.id)));
  }, []);

  return (
    <>
      {/* this card will be shown in movie list */}
      <Card
        key={id}
        ref={cardRef}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          height: "15rem",
          position: "relative",
          background: "black",
        }}
      >
        <Box key={id}>
          <Box
            sx={{
              width: "100%",
              opacity: "0.7",
              backgroundColor: "black",
              position: "absolute",
              bottom: "0px",
              display: "flex",
              justifyContent: "flex-start",
              color: "white",
              alignItems: "center",
            }}
          >
            <Typography variant="p">
              {rating.toString().substring(0, 3)}
            </Typography>
            <StarRateIcon sx={{ scale: "0.8" }} />
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: "500" }}
              variant="p"
            >
              {title.length > 18 ? title.substring(0, 18) + "..." : title}
            </Typography>
          </Box>
          <CardMedia
            sx={{ height: "15rem" }}
            image={`https://image.tmdb.org/t/p/original/${imagePath}`}
            title={title}
          />
        </Box>
      </Card>
      {/* this card will be shown when user click on any movie card from the list */}
      {open && (
        <Overlay onClick={() => setOpen(false)}>
          <Card
            key={id}
            sx={{
              border: "3px solid red",
              width: mobile ? "30rem" : "20rem",
              borderRadius: "2rem",
              display: "flex",
              background: "black",
              flexDirection: mobile ? "row" : "column",
              position: "sticky",
              justifySelf: "center",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: "15rem",
                scale: "1.1",
                borderRadius: "1rem",
                margin: "1rem",
                background: "black",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <CardMedia
                sx={{ height: "15rem", borderRadius: "1rem", margin: "1rem" }}
                image={`https://image.tmdb.org/t/p/original/${imagePath}`}
                title={title}
              />
            </Box>
            <CardContent
              sx={{
                width: mobile ? "15rem" : "20rem",
                height: "fit-content",
                backgroundColor: "black",
                color: "white",
              }}
              key={id}
            >
              <Typography key={title} gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <hr key={id}></hr>
              <Typography variant="body2" fontSize={14}>
                <Typography variant="p" fontSize={14} fontWeight={800}>
                  genre:
                </Typography>{" "}
                {genres.map((val) => (
                  <label>{val.name + ", "}</label>
                ))}
              </Typography>
              <Typography variant="p" fontSize={14} fontWeight={800}>
                rating:
              </Typography>
              <Typography variant="p" fontSize={14}>
                {""} {rating.toString().substring(0, 3)}
              </Typography>
              <Typography
                variant="body2"
                fontSize={14}
                width={mobile ? "auto" : "18rem"}
                maxHeight={"5rem"}
                sx={{
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  marginTop: "1rem",
                  scrollbarColor: "red black",
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Overlay>
      )}
    </>
  );
}
