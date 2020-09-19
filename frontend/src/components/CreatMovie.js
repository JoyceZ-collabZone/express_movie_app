import React, { useState } from "react";

export function CreateMovie(props){
  const [title, setTitle] = useState(props.movie.title);
  const [description, setDescription] = useState(props.movie.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    //call the add movie function in the parent class
    props.submitHandler({
      title: title,
      description: description
    });

    setTitle(""); //blank the form
    setDescription("");
  };

    return (
      <>
        <h2>{props.pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Movie:
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.currentTarget.value)}
              value={title}
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </>
    );
  
}
