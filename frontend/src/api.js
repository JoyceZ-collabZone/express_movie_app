/*
  the "fetchHeaderOptions" has been split into
  headerOptions variable and updateHeaderOptions function to allow 
  the header to be updated once the user has been logged in, otherwise
  if the user isn't logged in when the site loads no or expired token
  would be sent with each request

  this works due to ES6 module binding: https://2ality.com/2015/07/es6-module-exports.html
*/
let headerOptions = {
  "Content-Type": "application/json",
  token: window.localStorage.getItem("token"),
};

export function updateHeaderOptions () {
  console.log("updating token for API requests"); //called on login

  headerOptions = {
  "Content-Type": "application/json",
  token: window.localStorage.getItem("token"),
  }
};

export async function deleteMovie(id) {
  const result = await fetch("/api/v1/movies/" + id, {
    method: "DELETE",
    headers: headerOptions,
  });
  const data = await result.json();

  return data;
}

export async function getMovies() {
  const result = await fetch("/api/v1/movies", {
    headers: headerOptions,
  });
  const data = await result.json();

  return data;
}

export async function getMovieByID(id) {
  const result = await fetch("/api/v1/movies/" + id, {
    headers: headerOptions,
  });
  const data = await result.json();
  return data;
}

export async function addMovie(movieDetails) {
  const result = await fetch("/api/v1/movies", {
    method: "POST",
    body: JSON.stringify(movieDetails),
    headers: headerOptions,
  });
  const data = await result.json();

  return data;
}

export const updateMovie = async (id, movieDetails) => {
  const result = await fetch(`/api/v1/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(movieDetails),
    headers: headerOptions,
  });
  const data = await result.json();
  return data;
};

export async function login(userDetails) {
  const result = await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: headerOptions,
  });

  console.log(result);

  if(result.status > 299) {
    return Promise.reject('invalid login');
  }

  console.log(result)

  return result.headers.get("token");
}
