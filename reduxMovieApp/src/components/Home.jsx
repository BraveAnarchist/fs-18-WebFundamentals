import { useEffect } from "react";
import Search from "./Search.jsx";
import MoviesDisplay from "./MoviesDisplay.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../slice.js";

function Home() {
  const dispatch = useDispatch();
  const {
    trendingMoviesByDay,
    trendingMoviesByWeek,
    popularMovies,
    popularTVShows,
    topRatedMovies,
    topRatedTVShows,
  } = useSelector((state) => {
    return state.movieReducer;
  });

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  console.log(trendingMoviesByDay, trendingMoviesByWeek, topRatedTVShows);

  return (
    <>
      <Search />
      <MoviesDisplay
        heading="Trending"
        option1={trendingMoviesByDay}
        option2={trendingMoviesByWeek}
        choice1="Day"
        choice2="Week"
      />
      <MoviesDisplay
        heading="What's Popular"
        option1={popularMovies}
        option2={popularTVShows}
        choice1="Movies"
        choice2="TV Shows"
        firstAirDate={true}
      />
      <MoviesDisplay
        heading="Top Rated"
        option1={topRatedMovies}
        option2={topRatedTVShows}
        choice1="Movies"
        choice2="TV Shows"
        firstAirDate={true}
      />
    </>
  );
}

export default Home;
