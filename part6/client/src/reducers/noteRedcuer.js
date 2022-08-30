// here set up init of redux
const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.data);
    case "TOGGLE_IMPORTANCE": {
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

// const filterReducer = (state = "ALL", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.filter;
//     default:
//       return state;
//   }
// }; // create it at filter reducer js file

// type of action //
// {
//   type: 'SET_FILTER',
//   filter: 'IMPORTANT'
// }

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export default noteReducer;
