const bcrypt = require("bcrypt");
const { request } = require("http");
const { response } = require("../app");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  // checking for unique username
  const existUser = await User.findOne({ username });
  if (existUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// api for get all users in the db
// userRouter.get("/", async (request, response) => {
//   const users = await (await User.find({})).populate("notes");
//   response.json(users); // return all users
// });

// api for get specific data we want with notes, also doing same thing in notes.js
userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", { content: 1, date: 1 });

  response.json(users);
});

// format should looks like below (in json)
// {
//     "username": "root",
//     "name": "Superuser",
//     "password": "salainen"
// }

module.exports = userRouter;
