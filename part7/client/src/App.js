import ReactDOM from "react-dom/client";

import {
  BrowerRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router";

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

const App = () => {
  const Notes = ({ notes }) => (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  const padding = {
    padding: 5,
  };

  return (
    // Inside the router, we define links that modify
    // the address bar with the help of the Link component
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/notes">
            notes
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>
        <Routes>
          {/* Components rendered based on the URL of the browser are defined with the help of the component Route */}
          <Route path="/notes/:id" element={<Note notes={notes} />} />
          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <div>
          <i>Note app</i>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
