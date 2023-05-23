import { useState, useEffect } from "react";
import Note from "./Note";
import Notification from "./Notification";
import noteService from "./services/notes";
import "./styles.css";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  useEffect(() => {
    console.log("effect");
    noteService
      .getAll()
      .then(initialNotes => { setNotes(initialNotes) })
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (evt) => {
    evt.preventDefault();
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService
      .create(noteObj)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
        setNewNote('')
      })
  };

  const handleNoteChange = (evt) => {
    console.log(evt.target.value);
    setNewNote(evt.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
    </div>
  );
};

export default App;
