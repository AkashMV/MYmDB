import {useEffect, useState} from "react";
import Navbar from "./Components/Navbar";
import Box  from "./Components/Box";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import WatchedList from "./Components/WatchedList";

const KEY = 'e6883922'
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(function(){JSON.parse(localStorage.getItem("watched")}));
  const [watched, setWatched] = useState(function(){
    const movies = JSON.parse(localStorage.getItem("watched"))
    console.log(typeof(movies));
    return movies
  });
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading ,setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(false)

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(2)
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(2)
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0)

  function handleMovieClick(movieID){
    setSelectedMovie(movieID)
    console.log(selectedMovie);
  }

  useEffect(()=>{
    if (!query.trim()) return
    const controller = new AbortController()
    async function getMovies(){
      try{
      setIsError(false)
      setIsLoading(true)
      const movies = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
      console.log(movies);
      if (!movies.ok){
        throw new Error("")
      }else{
        const data = await movies.json()
        if(data.Response === "False"){
          throw new Error("No Movies Found")
        }else{
          console.log(data);
          !data.Search ?  setMovies([]) : setMovies(data.Search)
          setIsLoading(false)
        }
      }
    }
    catch(error){
      if(error.name !== "AbortError"){
      setIsLoading(false)
      setIsError(true)
      setErrorMessage(error.message)
      }
    }
  }
    getMovies()

    return function(){
      controller.abort()
    }
  }, [query])

  useEffect(function (){
    localStorage.setItem("watched", JSON.stringify(watched))
  },[watched])

  function addtoWatched(movie){
    console.log(movie)
    setWatched([...watched, movie])
  }

  function onWatchedMovieDelete(movieID){
    setWatched(watched.filter(movie=>movie.movieId !== movieID))
  }

  return (
    <>
    
    <Navbar query={query} setQuery={setQuery} movies={movies}/>
    
    <main className="main">

    <Box setIsOpen={setIsOpen1} isOpen={isOpen1} movies={movies}>
      {!isLoading && !isError && <MovieList movies={movies} handleMovieClick={handleMovieClick}/>
      }
      {isError && <ErrorMessage  errorMessage={errorMessage}/>}
      {isLoading && <Loader/>}
      {}
    </Box>

    <Box setIsOpen={setIsOpen2} isOpen={isOpen2} movies={watched}>
      {!selectedMovie ?  <>
              <div className="summary" >
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
              <WatchedList movies={watched} onMovieDelete={onWatchedMovieDelete} showMovieInfo={handleMovieClick}/>
            </> : <><MovieDetails movieId={selectedMovie} KEY={KEY} handleClose={()=>setSelectedMovie(false)} watched={watched} addtoWatched={addtoWatched}/></>}
            
      </Box>
    </main>
    </>
  );
}
