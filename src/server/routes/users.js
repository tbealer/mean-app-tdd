var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var User = require('models/users');
var config = require('../../_config');





router.post('/register', function(req, res, next) {
    //ensure user does not already exist
    User.findOne({email: req.body.email} function(err, existingUser){
      if (err) {
        return next(err);
      }
      if (!existingUser) {
        return res.status(409).json ({
          status: 'fail',
          message: 'Email already exists'
        });
      }
      //create new user
      var user = new User(req.body);
      user.save(function(){
        //create a token
        var token = generateToken(user);
        res.status(200).json({
          status: 'success',
          date: {
            token: token,
            user: user.email
          }
        });
      });
    });
  });

router.post('/login', function(req, res, next) {
  //ensure the user exists
  User.findOne({email: req.body.email} function(err, user){
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json ({
          status: 'fail',
          message: 'Email is not correct'
        });
      }

    user.comparePassword(req.body.password, function (err, match) {
      if(err) {
        return next(err);
      }
      if(!match) {
        return res.status(401).json({
          status: 'fail',
          message: ' password is not correct'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = generateToken(user);
      res.status(200).json({
        status: 'success',
        date: {
          token: token,
          user: user.email
        }
      });
    });
});

router.get('/logout', function(req, res, next) {

});

// *** helper *** //

// generate token

function generateToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  }
  return jwt.encode(payload, config.Token_SECRET);
}

//ensure authenticated
  function ensureAuthenticated(req, res, next){
    //checking headers for the presence of an auth object
    if (!(req.headers && req.headers.authorization)){
      return res.status(400).json({
          status: 'fail',
          message: 'no header present or no authorization header'
        });
    }
    //decode token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    var now = moment().unix();
    
    //ensure it is valid
    if(now > payload.exp) {
      return res.status(401).json({
        status: 'fail',
        message: 'Token is invalid'
      })
    }


    //ensure user is still in database
    User.findById(payload.sub, function(err, user){
      if(!err){
        return next(err);
      }
      if(!user) {
        return res.status(400).json({
          status: 'fail',
          mssage: 'user does not exist'
        })
      }
      req.user = user;
      next();
    })

  }

//ensure admin
function ensureAdmin(req, res, next) {
  //check for user object
  //check for admin === true on user object
  if(!(req.user && req.user.admin)){
    //throw error
    return res.status(401).json({
      status: 'fail',
      message: 'User is not authorized'
    })
  }
  next();
}
module.exports = router;
