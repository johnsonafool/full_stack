import { useEffect, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import loginService from "./services/login";
import noteService from "./services/notes";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState(""); // add event handler for form summit
  const [password, setPassword] = useState(""); // add event handler for form summit
  const [user, setUser] = useState(null); // init user state is null

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // We can have multiple effect hooks, so let's create a second one to handle the first loading of the page:
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []); // empty array ensures useEffect only be called at first rendering

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("loggin with ", username, password);
    try {
      // If the login is successful, the form fields are emptied and the server response (including a token and the user details) is saved to the user field of the application's state.
      const user = await loginService.login({
        username,
        password,
      });
      // it saves the details of a logged-in user to the local storage.
      // Values saved to the storage are DOMstrings, so we cannot save a JavaScript object as it is. The object has to be parsed to JSON first, with the method JSON.stringify
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      // The token returned with a successful login is saved to the application's state (setUser state)
      // the user's field token:
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      //If the login fails, or running the function loginService.login results in an error, the user is notified.
      setErrorMessage("input is wrong credential");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value); // target used in below
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* {user === null && loginForm()} 
      {user !== null && noteForm()}  // If the first statement evaluates to false, or is falsy, the second statement (generating the form) is not executed at all.*/}
      {/* {user === null ? loginForm() : noteForm()} */}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}

      {/* <h2>Notes</h2> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
