const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { sendVerificationEmail } = require("../utils/SendEmail");

const signupHandler = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      let newUser;
      if (req.files && req.files.length > 0) {
        newUser = new User({
          ...req.body,
          avatar: req.files[0].filename,
          password: hash,
          isActive: false,
        });
      } else {
        newUser = new User({
          ...req.body,
          password: hash,
          isActive: false,
        });
      }

      newUser
        .save()
        .then((result) => {
          try {
            sendVerificationEmail(result);

            res.status(201).json({
              messsage: "User created successfully!",
            });
          } catch (error) {
            res.status(500).json({
              error,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    }
  });
};

const emailVerificationHandler = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({
        messsage: "Verification failed!",
      });
    } else {
      User.updateOne({ username: decoded.username }, { isActive: true })
        .then((result) => {
          res.status(200).json({
            messsage: "User activated successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    }
  });
};

module.exports = {
  signupHandler,
  emailVerificationHandler,
};
