const bcrypt = require("bcrypt");
const { base64decode } = require("nodejs-base64");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");
const Token = require("../models/Token");

const { sendVerificationEmail } = require("../utils/SendEmail");
const { use } = require("../routes/User");

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

const emailVerificationHandler = async (req, res) => {
  try {
    const uid = base64decode(req.body.uid);
    const token = req.body.token;

    const user = await User.findOne({ username: uid });

    if (!user) {
      res.status(401).json({
        messsage: "User activation failed!",
      });
    }

    const tokenFound = await Token.findOne({
      user: uid,
      token,
    });

    if (!tokenFound) {
      res.status(401).json({
        messsage: "User activation failed!",
      });
    }

    user.isActive = true;

    await user.save();

    await tokenFound.delete();

    res.status(200).json({
      messsage: "User activated successfullY!",
    });
  } catch (error) {
    console.log(error);
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });

    if (!user) {
      return res.status(401).json({
        messsage: "Unable to login with provided credentials!",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        messsage: "Unable to login with provided credentials!",
      });
    }

    if (user.isActive) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        {
          username: user.username,
          userId: user._id,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        message: "User logged in successfully!",
        token,
        refreshToken,
      });
    } else {
      return res.status(401).json({
        messsage: "User is not activated!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

module.exports = {
  signupHandler,
  emailVerificationHandler,
  userLoginHandler,
};
