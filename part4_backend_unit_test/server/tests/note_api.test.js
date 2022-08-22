// supertest for sake of APi testing
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Note = require("../models/note");
const helper = require("./test_helper");

// comment this section bc we have written in test_helper.js //
// const initialNotes = [
//   { content: "HTML is easy", date: new Date(), important: false },
//   {
//     content: "Browser can execute only Javascript",
//     date: new Date(),
//     important: true,
//   },
// ];
// comment this section bc we have written in test_helper.js //

// logic happend before call API
beforeEach(async () => {
  await Note.deleteMany({});
  // let noteObj = new Note(initialNotes[0]);
  let noteObj = new Note(help.initialNotes[0]); // call it from test help function instead of hardcode it
  await noteObj.save();
  // noteObj = new Note(initialNotes[1]);
  noteObj = new Note(help.initialNotes[1]);
  await noteObj.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  // expect(response.body).toHaveLength(initialNotes.length);
  expect(response.body).toHaveLength(help.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

// wrting api test to see hte new added async/ await methood working properly
test("a aync/await style method can be added", async () => {
  const newNote = {
    important: true,
    content: "async/awiat simplified making async api calls",
  };

  await api
    .post("api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  // const res = await api.get("/api/notes");
  // const contents = res.body.map((r) => r.content);
  // expect(res.body).toHaveLength(initialNotes.length + 1);
  const noteAtEnd = await helper.notesInDb();
  expect(noteAtEnd.toHaveLength(helper.initialNotes.length + 1));
  expect(contents).toContain("async/awiat simplified making async api calls");
});

// test a post request without content will be rejected
test("note without content is not added", async () => {
  const newNote = {
    import: true,
    // content: null,
  };

  await api.post("/api/notes").send(newNote).expect(400); // rejected
  const noteAtEnd = await helper.notesInDb();
  expect(noteAtEnd).toHaveLength(helper.initialNotes.length);
  // const res = await api.get("/api/notes"); // fetching all the data from db
  // expect(res.body).toHaveLength(initialNotes.length); // check if the lenght is the same
});

// tests for fetching and removing an individual note
test("a specifirc note can be viewd", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToView = notesAtStart[0];
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const processedNoteToView = JSON.parse();
});

afterAll(() => {
  mongoose.connection.close();
});
