import "./App.css";
import Header from "./components/Header/Header";
import Featured from "./components/Featured/Featured";
import { useEffect, useState } from "react";
import GenreContext from "./components/context/GenreContext";
import MovieList from "./components/Movie/MovieList";
import { Box } from "@mui/material";

function App() {
  const [genres, setGenres] = useState([]);
  return (
    <>
      <GenreContext.Provider value={[genres, setGenres]}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            position: "fixed",
            zIndex: 1,
            background: "black",
          }}
        >
          <Header />
          <Featured />
        </Box>
        <MovieList />
      </GenreContext.Provider>
    </>
  );
}

export default App;
