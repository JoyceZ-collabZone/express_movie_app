import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieByID, updateMovie} from '../api';
import {CreateMovie} from './CreatMovie';
import FormCompleteMsg from './FormCompleteMsg';

function Edit() {
    let {id} = useParams();

    let [movie, setMovie] = useState(null);
    const [submitMsg, setSubmitMsg] = useState({msg: "", state: false});
    const [redirectHome, setRedirectHome] = useState(false);

    useEffect(() => {
      getMovie();
    }, [])

    const getMovie = async () => {
      const data = await getMovieByID(id)
      // console.log('edit page id: ' + id);
      setMovie(data.data);
    }

    const submitHandler = async(formData) => { 
      try {
        const data = await updateMovie(movie._id, formData);
        setSubmitMsg({msg: "Movie Updated, edit another?", state: true});
      }     
      catch (e) {
        console.log(e);
        setSubmitMsg({msg: "Something went wrong, please try again!", state: false});
      }
      
    }

    return (
      <React.Fragment>
        {
          !movie && <p>loading...</p>
        }

        {
          movie && <CreateMovie pageTitle={"Edit Movie"} 
                  movie={movie} submitHandler={submitHandler}  />
        }

      <FormCompleteMsg submitMsg={submitMsg} 
                  setRedirectHome={setRedirectHome}
                  redirectHome={redirectHome}  />

      </React.Fragment>
    )
  }


export default Edit;