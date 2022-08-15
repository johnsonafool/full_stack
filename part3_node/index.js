// console.log("hello world");
// Debug with chrome dev consloe: node --inspect index.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
const Note = require("./models/note");
const note = require("./models/note");
app.use(express.json());
app.use(cors());

// const http = require("http");

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello World");
// });

const url = ""; //mongo db url

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

// console.log(notes);
// console.log(typeof notes);

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      // response.json(note);
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });

  // const id = Number(request.params.id);
  // const note = notes.find((note) => note.id === id);
  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }

  //   console.log(id);
  //   const note = notes.find((note) => {
  //     console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  //     return note.id === id;
  //   });
  //   console.log(note);
  //   response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// app.post("/api/notes", (request, response) => {
//   const note = request.body;
//   console.log(note);
//   response.json(note);
// });

// app.post("/api/notes", (request, response) => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

//   const note = request.body;
//   note.id = maxId + 1;

//   notes = notes.concat(note);

//   response.json(note);
// });

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: "content missing",
  //   });
  // }

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   date: new Date(),
  //   id: generateId(),
  // };

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  // notes = notes.concat(note);

  // response.json(note);

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// const PORT = process.env(PORT) || 3001;

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
