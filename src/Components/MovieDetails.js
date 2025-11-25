import {useState,  useEffect } from "react";
import StarRater from "./StarRater";
import Loader from "./Loader";

export default function MovieDetails({movieId, KEY, handleClose, watched, addtoWatched}){
    const [movie, setMovie] = useState(movieId)
    const [userRating, setUserRating] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(function(){
        setLoading(true)
        async function getMovieDetails() {
            console.log(`movidID: ${movieId}`);
            const movie = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`)
            const data = await movie.json()
            console.log(data)
            setMovie(data)
            setLoading(false)
            setUserRating(0)
    }
        getMovieDetails()
}
    ,[movieId])

    function handleStarClick(rating){
        console.log(rating)
        setUserRating(Number(rating))
    }

    function handleAdd(){
        console.log(userRating);
        const movieObject = {
            movieId: movie.imdbID,
            title: movie.Title,
            userRating: Number(userRating),
            imdbRating: Number(movie.imdbRating),
            poster: movie.Poster,
            runtime: Number(movie.Runtime.split(" ")[0])
        }
        addtoWatched(movieObject)
        handleClose()
    }
    useEffect(function(){
        document.title = `MymDB | ${movie.Title}`
        return function(){document.title = "MymDB"}
    }, [movie])

    return (
        <>
        {loading === true ? <Loader/> :<div className="details">
        <header>
        <button className="btn-back" onClick={handleClose}>&larr;</button>
        <img src={movie.Poster} alt={`poster for ${movie.Title}`}></img>
        <div className="details-overview">
            <h2>{movie.Title}</h2>
            <p>{movie.Released} &bull; {movie.Runtime}</p>
            <span>⭐ {movie.imdbRating}</span>
        </div>
        </header>
        <section>
        <div className="rating">
            {watched.find(watchedMovie=>watchedMovie.movieId === movie.imdbID) ? <em>Movie already added </em> :
            (
            <>
                <StarRater maxRating={10} size={24} onSetRating={handleStarClick}/>
                {userRating > 0 ? <button className="btn-add" onClick={handleAdd}>Add to watched list</button> : "" }
            </>
            )}
        </div>
        <p><em>{movie.Plot}</em></p>
        <p>Actors: {movie.Actors}</p>
        <p>Directed By: {movie.Director}</p>
        </section>
        </div>}
        </>
    )
}