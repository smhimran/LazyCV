const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const sendVerificationEmail = (user) => {
  const token = jwt.sign(
    {
      name: user.name,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );

  const html = `<p>Hello ${user.name}</p>
        <p>Thanks for signing up on ${process.env.APP_NAME}. Now before you login, you need to activate the account.</p>
        <p>To activate the account, please click the 'Activate' button below.</p>
        <div>
            <a href="${process.env.APP_URL}/users/activate/${token}" style="background: #eb4034; padding: 10px 20px; font-size: 16px; color: #ffffff; text-decoration: none;">Activate</a>
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

module.exports = {
  sendVerificationEmail,
};
