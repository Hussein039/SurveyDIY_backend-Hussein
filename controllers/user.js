let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

  
module.exports.signup = function(req, res, next) {
      console.log(req.body);
      let user = new User(req.body);

      console.log(user);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);

          return res.status(400).json(
            {
              success: false, 
              message: message
            }
          );

        }

        return res.status(200).json(
          {
            success: true, 
            message: 'User created successfully!'
          }
        );

      });
  };


 
module.exports.signin = function(req, res, next){
  passport.authenticate( 
    'login', 
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400)
            .json(
              { 
                success: false, 
                message: err || info.message
              }
            );
        }
    
        req.login(
            user,
            { session: false },
            async (error) => {
              if (error) {
                return next(error);
              }

              const payload = 
                { 
                  _id: user._id, 
                  username: user.username,
                  email: user.email
                };

              const token = jwt.sign(
                { 
                  payload: payload
                }, 
                config.SECRETKEY, 
                { 
                  algorithm: 'HS512', 
                  expiresIn: "60min"
                }
              );
      
              return res.json(
                  { 
                    success: true, 
                    token: token 
                  }
                );
            }
          );
        } catch (error) {
          // return next(error);
          console.log(error);
          return res.status(400).json({ success: false, message: error});
        }
      }
  )(req, res, next);
} 

module.exports.retrieve = function(req, res, next) {
  let id = req.user._id;
  User.findById(id, (err, user) => {
      if(err)
      {
          return res.status(400).json(
            { 
              success: false, 
              message: getErrorMessage(err)
            }
        );
      }
      else
      {
          //return user profile
          return res.status(200).json(user);
      }
  });       
};


module.exports.processEdit = (req, res, next) => {
  let id = req.user._id;

  let updatedItem = User({
    _id: id,
    username: req.body.username,
    password : req.body.password,
    lastName: req.body.lastName,
    firstName : req.body.firstName,
    email : req.body.email
  });

  updatedItem.updateHashPassword(updatedItem.password);

  User.updateOne({_id: id}, updatedItem, (err) => {
    if(err)
    {
        return res.status(400).json(
        { 
          success: false, 
          message: getErrorMessage(err)
        }
        );
    }
    else
    {
        //update user
        return res.status(200).json(updatedItem);
    }
  });
  
}