const nodemailer = require("nodemailer");
const crypto = require("crypto");
const createError = require("http-errors");
const { base64encode } = require("nodejs-base64");

const Token = require("../models/Token");

const sendVerificationEmail = async (user) => {
  let token = await Token.findOne({ user: user._id });

  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const uid = base64encode(user.username);

  const html = `<p>Hello ${user.name}</p>
        <p>Thanks for signing up on ${process.env.APP_NAME}. Now before you login, you need to activate the account.</p>
        <p>To activate the account, please click the 'Activate' button below.</p>
        <div>
            <a href="${process.env.APP_URL}/users/activate/${uid}/${token.token}" style="background: #eb4034; padding: 10px 20px; font-size: 16px; color: #ffffff; text-decoration: none;">Activate</a>
        </div>
        <p>Thanks for using our site!</p>
        <p><b>The ${process.env.APP_NAME} Team</b></p>
    `;

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: user.email,
    subject: `Account activation on ${process.env.APP_NAME}`,
    html: html,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      throw createError(err);
    } else {
      console.log("Email sent successfully!");
      return info;
    }
  });
};

const sendPasswordResetEmail = async (user) => {
  let token = await Token.findOne({ user: user._id });

  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const uid = base64encode(user.username);

  const html = `<p>Hello ${user.name}</p>
        <p>You received this email because you requested to reset your password on ${process.env.APP_NAME}.</p>
        <p>To reset the password, please click the 'Reset Password' button below.</p>
        <div>
            <a href="${process.env.APP_URL}/users/reset-password/${uid}/${token.token}" style="background: #eb4034; padding: 10px 20px; font-size: 16px; color: #ffffff; text-decoration: none;">Reset Password</a>
        </div>
        <p>If you didn't request this, ignore this email</p><br/>
        <p>Thanks for using our site!</p>
        <p><b>The ${process.env.APP_NAME} Team</b></p>
    `;

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: user.email,
    subject: `Password reset on ${process.env.APP_NAME}`,
    html: html,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      throw createError(err);
    } else {
      console.log("Email sent successfully!");
      return info;
    }
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
