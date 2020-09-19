const express = require('express');
// Next we set up the Router
const router = express.Router();
const jwt = require('jsonwebtoken');

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Movie = require('../models/movie');

//middleware to Verify JWT token
//reject request if not valid
const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID
router.use((req, res, next) => {
  const token = req.get('token');

  jwt.verify(token, secretKey, {algorithms: ["HS256"]}, (err, decode) => {
    if(!err) {
      req.user = decode; //store user info on request object
      next(); //middleware complete, move to next endpoint
    }
    else {
      res.status(401).send('please login');
    }
  })

})

// Creating the index route
// index route should show all the fruits
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {

      const allMovies = await Movie.find();

      // This is the response to react
      res.json({
        status: {
            code: 200,
            message: "Success"
          },
        data: allMovies
      });

    } catch (err){

      res.send(err)

    }
});


router.post('/', async (req, res) => {

  try {
    console.log(req.body, ' this is req.body');
    const createdMovie = await Movie.create(req.body);
    console.log('response happening?')
    res.json({
      status: {
            code: 201,
            message: "Resource successfully created"
          },
      data: createdMovie
    });

  } catch(err){
    console.log(err);
    res.send(err);
  }
});





router.get('/:id', async (req, res, next) => {


     try  {

        const foundMovie = await Movie.findById(req.params.id);
        res.json({
          status: {
            code: 200,
            message: "Success"
          },
          data: foundMovie
        });

      } catch (err){
        res.send(err);
      }



});

router.put('/:id', async (req, res) => {

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: {
            code: 201,
            message: "Resource successfully updated"
          },
      data: updatedMovie
    });
  } catch(err){
    res.send(err)
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
      res.json({
        status:  {
            code: 200,
            message: "Resource successfully deleted"
          },
        data: deletedMovie
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
