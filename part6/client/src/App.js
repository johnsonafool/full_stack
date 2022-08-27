import { useDispatch, useSelector } from "react-redux";
import { createNote, toggleImportanceOf } from "./reducers/noteRedcuer";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state); // The component can access the notes stored in the store with the useSelector-hook of the react-redux library.
  //   const importantNotes = useSelector(state => state.filter(note => note.important))

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <Notes />
    </div>
  );
};

export default App;
