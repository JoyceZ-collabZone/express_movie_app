import React, {useState, useEffect} from 'react';
import {getMovies, deleteMovie} from '../api';
import {MovieList} from './MovieList';
import {Redirect} from 'react-router-dom';

function Home() {
    //use state hook
    const [movies, setMovies] = useState([]); //assign empty movie array to state    
    const [editID, setEditID] = useState(null);

    //in place of componentDidMount
    useEffect(() => {
        refreshMovies();

    }, [])

    const refreshMovies = async () => {
        const data = await getMovies();
        setMovies(data.data);
    }

    const editMovie = (moveID) => {
        console.log(moveID);
        setEditID(moveID);
    }

    const deleteMovieHandler = async (id) => {                    
        const data = await deleteMovie(id);        
        setMovies(movies.filter((movie) => movie._id !== data.data._id));
      };

    return (
        <React.Fragment>
            <p>home works</p>
            <MovieList movies={movies} editMovie={editMovie} delMovie={deleteMovieHandler} />
            {
                editID && <Redirect to={`/edit/${editID}`} />
            }
      </React.Fragment>
    )
  }

export default Home;