import { useEffect, useState } from "react";



export const BuscadorPeliculas = () => {


  const URL_BASE = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "d0c09af6ce38e404c6ef80691822c4f2";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const handleInputChange = ({ target }) => {
    setBusqueda(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };
  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${URL_BASE}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      <div className="movie-list">
        {peliculas.map((pelicula) => {
          return (
            <div key={pelicula.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <h2>{pelicula.title}</h2>
              <p>{pelicula.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
