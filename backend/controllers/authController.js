const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

router.post('/login', async (req, res) => {

  // First query the database to see if the user exists
  try {

    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser, ' foundUser');

     // If the user exists we'll use bcrypt to see if their password
  // is valid
  if(foundUser){

    // bcrypt compare returns true // or false
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      //sign a new JWT token
      const payload = {
        id: foundUser._id,
        user: foundUser.username
      };

      jwt.sign(payload, secretKey, {expiresIn: '1h'}, (err, token) => {
        res.set('token', token);
        res.send();
      })

    } else {
      res.status(404).send();
    }
  } else {

    res.status(404).send();

  }
  } catch(err){
    res.status(404).send(err);
  }

});


router.post('/register', async (req, res) => {

  // Encrypt our password
  const password = req.body.password;

  // encrypt our password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(hashedPassword)

  req.body.password = hashedPassword;

  // We create our use
  try {
      const createdUser = await User.create(req.body);
      console.log(createdUser, ' created user');

      // set info on the session
      /*
      req.session.userId = createdUser._id;
      req.session.username = createdUser.username;
      req.session.logged = true;
      */

      //res.redirect('/authors');
      res.send();
  } catch (err){
    res.send(err)
  }

});


router.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');// back to the homepage
    }
  })

})



module.exports = router;
