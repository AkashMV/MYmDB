import { useEffect, useRef } from "react"

export default function Navbar({query, setQuery, movies}){
    const inputElement = useRef(null)

    useEffect(function(){inputElement.current.focus()},[])

    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>MImDB</h1>
            </div>
            <input
            ref={inputElement}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    )
}