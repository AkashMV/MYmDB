export default function WatchedList({movies, onMovieDelete, showMovieInfo}){
    return (
    <>
        <ul className="list" style={{overflow: "hidden"}}>
            {movies?.map((movie) => (
                <li key={movie.movieId}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3 onClick={()=>showMovieInfo(movie.movieId)}>{movie.title}</h3>
                    <div>
                        <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                        </p>
                        <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                        </p>
                        <p>
                        <span>🕰️</span>
                        <span>{movie.runtime}</span> min
                        
                        </p>
                        <button className="btn-delete" onClick={()=>onMovieDelete(movie.movieId)}>x</button>
                    </div>
                </li>
            ))}
        </ul>
    </>
    )
}