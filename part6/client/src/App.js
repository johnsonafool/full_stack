import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { setNotes } from "./reducers/noteRedcuer";
import noteService from "./services/notes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, [dispatch]);
  // If the value of the dispatch-variable would change during runtime,
  //the effect would be executed again

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
  // const dispatch = useDispatch();
  // const notes = useSelector((state) => state); // The component can access the notes stored in the store with the useSelector-hook of the react-redux library.
  //   const importantNotes = useSelector(state => state.filter(note => note.important))

  // const addNote = (event) => {
  //   event.preventDefault();
  //   const content = event.target.note.value;
  //   event.target.note.value = "";
  //   dispatch(createNote(content));
  // };

  // const toggleImportance = (id) => {
  //   dispatch(toggleImportanceOf(id));
  // };

  // return (
  //   <div>
  //     <form onSubmit={addNote}>
  //       <input name="note" />
  //       <button type="submit">add</button>
  //     </form>
  //     <ul>
  //       {notes.map((note) => (
  //         <li key={note.id} onClick={() => toggleImportance(note.id)}>
  //           {note.content} <strong>{note.important ? "important" : ""}</strong>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default App;
