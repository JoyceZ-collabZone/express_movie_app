import React from "react";

export function MovieList(props){
  
  return (
    <ul>
      {props.movies.map((movie) => {
        return (
          <li key={movie._id}>
            Title: {movie.title} Description: {movie.description}
            <button onClick={() => props.delMovie(movie._id)}>
              Remove
            </button>
            <button onClick={() => props.editMovie(movie._id)}>
              Edit
            </button>
          </li>
        );
      })}
    </ul>
  );
  
}
