import Result from "./Components/Result";
import axios from "axios";
import { useState, useEffect } from "react";

const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1`;
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&language=en-US&query=`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };

  const getAllMovies = async () => {
    try {
      const response = await axios.get(APIURL);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedMovies = async () => {
    try {
      const response = await axios.get(`${SEARCHAPI}${search}`);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMovies([]);
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search]);

  return (
    <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3">
      <input
        type="search"
        value={search}
        onChange={changeTheSearch}
        className="w-full border border-black rounded text-slate-700 p-4"
      />
      {movies.length === 0 ? (
        <div className="text-3xl text-center mt-2"> Loading... </div>
      ) : (
        <Result movies={movies} />
      )}
    </div>
  );
};

export default App;
