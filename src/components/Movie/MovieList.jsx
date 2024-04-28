import { Box, styled, useMediaQuery } from "@mui/material";
import MovieCard from "./MovieCard";
import { useEffect, useId, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import GenreContext from "../context/GenreContext";
import { getAllMovies, getGenre } from "../../api/movie";
// styled Grid component for showing the movie card in grid form.
const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "1rem",
  padding: "1rem",
  // breakpoints for the responsibe web application
  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "auto auto auto auto auto auto ",
  },
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "auto auto auto auto auto ",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "auto auto auto auto ",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "auto auto auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "auto auto ",
  },
  [theme.breakpoints.down("sx")]: {
    gridTemplateColumns: "auto",
  },
}));
export default function MovieList() {
  // as the requirement default year is set to 2012
  const defaultYear = 2012;
  const page = 1;
  const [items, setItems] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [length, setLength] = useState(0);
  const [year, setYear] = useState(defaultYear);
  const [prevYear, setPrevYear] = useState(defaultYear - 1);
  const [hasMore, setHasMore] = useState(true);
  const mobile = useMediaQuery("(min-width:500px)");
  const [genres] = useContext(GenreContext);
  const [genresList, setGenresList] = useState([]);
  const ref = useRef(null);
  const uId = useId();
  // this function call the api function to get the movie data from server based on the selected genre
  const fetchGenreData = () => {
    setHasMore(true);
    getAllMovies(page, defaultYear, genres)
      .then((data) => {
        if (data.results.length > 0) {
          setItems([{ year: defaultYear, data: [...data.results] }]);
          setLength(data.results.length);
        } else {
          setItems([]);
          loadMore();
        }
        setYear(defaultYear + 1);
      })
      .catch((err) => setError({ status: true, message: err.TypeError }));
  };
  // this function loads the data from the server for the given year
  const loadByYear = (year) => {
    setHasMore(true);
    const d = new Date();
    let currentYear = d.getFullYear();
    if (currentYear >= year) {
      getAllMovies(page, year, genres)
        .then((data) => {
          if (data.results.length > 0) {
            setItems([...items, { year: year, data: [...data.results] }]);
            setYear((prev) => prev + 1);
            setLength(length + data.results.length);
          } else {
            loadByYear(year + 1);
            setYear(year + 1);
          }
        })
        .catch((err) => setError({ status: true, message: err.TypeError }));
    } else {
      setHasMore(false);
    }
  };
  // this load previous year data from the server
  const loadPreviousYear = () => {
    setHasMore(true);

    getAllMovies(page, prevYear, genres)
      .then((data) => {
        if (data.results.length > 0) {
          setItems([{ year: prevYear, data: [...data.results] }, ...items]);
          setPrevYear((prev) => prev - 1);
          setLength(length + data.results.length);
        }
      })
      .catch((err) => setError({ status: true, message: err.TypeError }));
  };
  // this function load the data for the next year as soon as scroll move to down
  const loadMore = () => {
    setHasMore(true);
    const d = new Date();
    let currentYear = d.getFullYear();
    if (currentYear >= year) {
      getAllMovies(page, year, genres)
        .then((data) => {
          if (data.results.length > 0) {
            setItems([...items, { year: year, data: [...data.results] }]);
            setLength(length + data.results.length);
          } else {
            // setYear(prev=>prev+1)
            loadByYear(year + 1);
          }
        })
        .catch((err) => setError({ status: true, message: err.TypeError }));
      setYear((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };
  // when data length is lesser than 30 it call loadMore function to load more data
  useEffect(() => {
    if (length < 30 && hasMore) {
      loadMore();
    }
  }, [length]);
  // it checks genre is selected or deselected and fetch data for the selected genre
  useEffect(() => {
    fetchGenreData();
    setTimeout(() => window.scroll(0, 9), 100);
    setTimeout(() => {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 2000);
  }, [genres.length]);

  // this will initialy scroll the page to the default year that is 2012
  useEffect(() => {
    if (genres.length == 0) setTimeout(() => window.scroll(0, 9), 100);
  }, []);
  // it checks the scroll up and fetch the previous year data after applying selected genre filters
  const checkScrolligUp = () => {
    if (window.scrollY < 10) {
      loadPreviousYear();
      window.scroll(0, 1000);
    }
  };
  // fetching genre list from server
  useEffect(() => {
    getGenre().then((res) => {
      setGenresList(res.genres);
    });
  }, []);
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      scrollableTarget={""}
      onScroll={checkScrolligUp}
      loader={
        <Box
          sx={{
            paddingLeft: "1rem",
            color: "white",
            fontSize: mobile ? "1.3rem" : "1.3rem",
          }}
        >
          Loading...
        </Box>
      }
      endMessage={
        <Box
          sx={{
            paddingLeft: "1rem",
            color: "white",
            fontSize: mobile ? "1.3rem" : "1.3rem",
          }}
        >
          No more data to load.
        </Box>
      }
    >
      {error.status ? (
        <Box
          sx={{
            paddingLeft: "1rem",
            color: "white",
            fontSize: mobile ? "1.3rem" : "1.3rem",
          }}
        >
          {error.message}
        </Box>
      ) : (
        items.map((item) => (
          <>
            {" "}
            {item.year == defaultYear ? (
              <Box
                ref={ref}
                key={uId}
                sx={{
                  paddingLeft: "1rem",
                  paddingTop: "1rem",
                  color: "red",
                  fontSize: mobile ? "2rem" : "1.3rem",
                }}
              >
                {item.year}
              </Box>
            ) : (
              <Box
                key={uId}
                sx={{
                  paddingLeft: "1rem",
                  paddingTop: "1rem",
                  color: "red",
                  fontSize: mobile ? "2rem" : "1.3rem",
                }}
              >
                {item.year}
              </Box>
            )}
            <Grid sx={{ marginTop: "0px", paddingTop: "0px" }}>
              {item.data.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imagePath={movie.poster_path}
                    movieGenres={movie.genre_ids}
                    genresList={genresList}
                    rating={movie.vote_average}
                    description={movie.overview}
                  />
                );
              })}
              {items.length == 0 && (
                <Box
                  sx={{ color: "red", fontSize: mobile ? "1.3rem" : "1.3rem" }}
                >
                  NO DATA FOUND.
                </Box>
              )}
            </Grid>
          </>
        ))
      )}
    </InfiniteScroll>
  );
}
