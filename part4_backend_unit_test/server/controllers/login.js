// json web token
// If the application has multiple interfaces requiring identification
// JWT's validation should be separated into its own middleware
// Some existing library like express-jwt could also be used.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

// const process = require("dotenv"); // ?? not sure

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash); // hash compare two

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password", // invalid request
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // const token = jwt.sign(userForToken, process.env.SECRET); // password is correct
  // process .env.SECRET
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // in one hour
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
