const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path')

// creating the express app
const app = express()
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
})