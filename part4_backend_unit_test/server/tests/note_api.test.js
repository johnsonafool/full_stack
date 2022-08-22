// supertest for sake of APi testing
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Note = require("../models/note");

const initialNotes = [
  { content: "HTML is easy", date: new Date(), important: false },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  // logic happend before call API
  await Note.deleteMany({});
  let noteObj = new Note(initialNotes[0]);
  await noteObj.save();
  noteObj = new Note(initialNotes[1]);
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

  expect(response.body).toHaveLength(initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

// wrting api test to see hte new added async/ await methood working properly
test("a aync/await style method can be added", async () => {
  const newNote = {
    content: "async/awiat simplified making async api calls",
    important: true,
  };

  await api
    .post("api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const res = await api.get("/api/notes");
  const contents = res.body.map((r) => r.content);
  expect(res.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain("async/awiat simplified making async api calls");
});

afterAll(() => {
  mongoose.connection.close();
});
