import "./styles.css";
import { useState, useEffect } from "react";
import firebase from "firebase";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";

export default function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, []);

  const addNote = async (title) => {
    const newNote = {
      title: title,
      body: ""
    };

    const newNoteFromDB = await firebase.firestore().collection("notes").add({
      title: newNote.title,
      body: newNote.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    const newId = newNoteFromDB.id;
    setNotes([...notes, newNote]);

    const [newNoteAdded] = notes.filter((note) => note.id === newId);
    const newNoteIndex = notes.indexOf(newNoteAdded);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  };

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const updateNote = (id, note) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: note.title,
      body: note.text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      const noteIndex = notes.indexOf(note);
      setNotes(notes.filter((note) => note !== note));
      if (selectedNoteIndex === noteIndex) {
        setSelectedNoteIndex(null);
        setSelectedNote(null);
      } else {
        notes.length > 1
          ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
          : setSelectedNoteIndex(null);
        setSelectedNote(null);
      }

      firebase.firestore().collection("notes").doc(note.id).delete();
    }
  };

  return (
    <div className="app-container">
      <SideBar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        addNote={addNote}
      />
      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          updateNote={updateNote}
        />
      ) : null}
    </div>
  );
}
