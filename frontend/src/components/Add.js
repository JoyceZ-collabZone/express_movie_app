import React, {useState} from 'react';
import {CreateMovie} from './CreatMovie';
import { addMovie } from '../api';
import FormCompleteMsg from './FormCompleteMsg';

function Add() {
  const [submitMsg, setSubmitMsg] = useState({msg: "", state: false});
  const [redirectHome, setRedirectHome] = useState(false);

  const addMovieHandler = async (movieDetails) => {
    try {
      const data = await addMovie(movieDetails);
      console.log(data);
      setSubmitMsg({msg: "Movie Added, add another?", state: true});
    }
    catch(e) {
      console.log(e);
      setSubmitMsg({msg: "Something went wrong, please try again!", state: false});
    } 

  };

    return (
      <React.Fragment>
        <CreateMovie submitHandler={addMovieHandler} 
        pageTitle={"Create Movie"} 
        title={""} description={""}
        movie={{title: "", description:""}}/>

        <FormCompleteMsg submitMsg={submitMsg} 
                  setRedirectHome={setRedirectHome}
                  redirectHome={redirectHome}  />
      </React.Fragment>
    )
  }

export default Add;