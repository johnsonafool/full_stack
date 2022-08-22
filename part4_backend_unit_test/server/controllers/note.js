const notesRouter = require("express").Router();
const { request } = require("http");
const { response } = require("../app");
const Note = require("../models/note");

// notesRouter.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// async style for get certain id
notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = Note.findById(request.params.id);

    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch {
    (exception) => next(exception);
  }
});

// async style for delte certain id
notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAnRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    {
      next(exception);
    }
  }
});

// async func should follow this style
// try {
//   // do the async operations here
// } catch(exception) {
//   next(exception)
// }

// if async/await method has been chosen for api call, try cathc block will be used for handle the error
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    // The catch block simply calls the next function, which passes the request handling to the error handling middleware.
    next(exception);
    // console.log(exception);
  }

  // note
  //   .save()
  //   .then((savedNote) => {
  //     // response.json(savedNote);
  //     response.status(201).json(savedNote);
  //   })
  //   .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
