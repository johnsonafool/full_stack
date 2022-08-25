const { request } = require("http");
const Note = require("../models/note");
const User = request("../models/user");

// dummy test data
const initialNotes = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

// dummy api call
const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon", date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

// check notes stored in db
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

// verify the state of the database after a user is created
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
