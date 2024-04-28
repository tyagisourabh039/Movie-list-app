import { Box, Button, styled, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { getGenre } from "../../api/movie";
import { FlexBox } from "../Header/Header";
import GenreContext from "../context/GenreContext";

// styled Label component for the genre filter
const Label = styled("div")(() => ({
  padding: "0.2rem 1rem",
  backgroundColor: "transparent",
  color: "red",
  fontSize: "1rem",
  border: "0.1rem solid red",
  borderRadius: "2rem",
  minWidth: "fit-content",
  "&:hover": {
    cursor: "pointer",
  },
}));
//styled label component for the active genre filter or selected genre
const ActivatedLabel = styled("div")(() => ({
  padding: "0.2rem 1rem",
  backgroundColor: "red",
  color: "black",
  border: "0.1rem solid red",
  borderRadius: "2rem",
  minWidth: "fit-content",
  "&:hover": {
    cursor: "pointer",
  },
}));
// Here start the main function of Featured Component, It is showing all the genre list
function Featured() {
  const [genres, setGenres] = useContext(GenreContext);
  const [allGenres, setAllGenres] = useState([]);
  const [activeId, setActiveId] = useState(genres);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const genreRef = useRef(null);
  const mobile = useMediaQuery("(min-width:500px)");
  // when page load to the browser this useffect will run, inside we are fetching all genre list from server
  useEffect(() => {
    getGenre().then((res) => {
      setAllGenres(res.genres);
    });
  }, []);

  // this function add the clicked filter to the state variable
  const handleSelection = (id) => {
    setActiveId([...activeId, id]);
    setGenres(activeId.join("|") + "|" + id);
  };
  // this function remove the clicked filter from the state variable
  const handleDeselection = (id) => {
    let removedIdArray = activeId.filter((aId) => aId != id);
    setActiveId(removedIdArray);
    setGenres(removedIdArray.join("|"));
  };
  // this function remove all the filters from the state variable
  const handleDeselectionAll = () => {
    setActiveId([]);
    setGenres("");
  };
  // this function add all the filter to the state variable
  const handleSelectionAll = () => {
    let allIds = [];
    allGenres.forEach((value) => {
      allIds.push(value.id);
    });
    setActiveId([]);
    setGenres(allIds.join("|"));
  };
  // scroll genre filter to left
  const handleGenreLeftScroll = () => {
    var startPosition =
      genreRef.current.firstElementChild.getBoundingClientRect();
    // checking for partial visibility
    if (startPosition.right < 0 && scrollPosition > 0) {
      setShowRight(true);
      genreRef.current.scrollTo(scrollPosition - window.innerWidth, 0);
      setScrollPosition((prev) => prev - window.innerWidth);
    }
    if (scrollPosition <= window.innerWidth) {
      setShowLeft(false);
    }
  };
  const handleGenreRightScroll = () => {
    // checking for partial visibility
    if (
      window.innerWidth <
      document.getElementById("lastFilter").getBoundingClientRect().x
    ) {
      setShowLeft(true);
      genreRef.current.scrollTo(scrollPosition + window.innerWidth, 0);
      setScrollPosition((prev) => prev + window.innerWidth);
    }
    // if(scrollPosition >=document.getElementById('lastFilter').getBoundingClientRect().x){
    //     setShowRight(true);
    // }
    if (
      window.innerWidth >=
      document.getElementById("lastFilter").getBoundingClientRect().x
    ) {
      setShowRight(false);
    }
  };
  // show arrow on mouse over
  const handleShowArrow = () => {
    setShowArrow(true);
  };
  // hide arrow on mouse out
  const handleHideArrow = () => {
    setShowArrow(false);
  };
  return (
    <FlexBox
      ref={genreRef}
      onMouseOver={handleShowArrow}
      onMouseOut={handleHideArrow}
      sx={{
        flexWrap: "nowrap",
        marginTop: "1rem",
        scrollbarColor: "transparent transparent",
        height: "3rem",
        overflowX: "scroll",
        width: "auto",
        justifyContent: "flex-start",
        gap: "1rem",
      }}
    >
      {activeId.length == 0 ? (
        <ActivatedLabel key={0} onClick={() => handleDeselectionAll()}>
          {"All"}
        </ActivatedLabel>
      ) : (
        <Label key={0} onClick={() => handleSelectionAll()}>
          {"All"}
        </Label>
      )}
      {allGenres.map((genre, index) => {
        if (activeId.includes(genre.id)) {
          return (
            <ActivatedLabel
              id={index == allGenres.length - 1 ? "lastFilter" : ""}
              key={genre.id}
              onClick={() => handleDeselection(genre.id)}
            >
              {genre.name.length < 16
                ? genre.name
                : genre.name.substring(0, 15) + "..."}
            </ActivatedLabel>
          );
        } else {
          return (
            <Label
              key={genre.id}
              id={index == allGenres.length - 1 ? "lastFilter" : ""}
              onClick={() => handleSelection(genre.id)}
            >
              {genre.name.length < 16
                ? genre.name
                : genre.name.substring(0, 15) + "..."}
            </Label>
          );
        }
      })}
      {mobile && showArrow && showLeft && (
        <Button
          sx={{
            color: !mobile ? "transparent" : "red",
            background: "black",
            opacity: 0.8,
            position: "absolute",
            zIndex: 1,
            fontSize: "2rem",
            left: "0px",
            outline: "1px solid red",
            height: "3rem",
            "&:hover": {
              color: "red",
              background: "black",
            },
          }}
          onClick={handleGenreLeftScroll}
        >
          {"<"}
        </Button>
      )}
      {mobile && showArrow && showRight && (
        <Button
          sx={{
            color: "red",
            background: "black",
            opacity: 0.8,
            position: "absolute",
            fontSize: "2rem",
            zIndex: 1,
            outline: "1px solid red",
            right: "0px",
            height: "3rem",
            "&:hover": {
              color: "red",
              background: "black",
            },
          }}
          onClick={handleGenreRightScroll}
        >
          {">"}
        </Button>
      )}
    </FlexBox>
  );
}
export default Featured;
