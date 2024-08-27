import { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note";
import Header from "./Header";

function App() {
  interface NoteProps {
    title: string;
    description: string;
    date: string;
  }
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    LoadTodos();
  }, []);

  useEffect(() => {
    SaveTodos(notes);
  }, [notes]);

  const addNote = (title: string, description: string, date: string) => {
    setNotes([
      ...notes,
      { title: title, description: description, date: date },
    ]);
    console.log(notes);
  };

  const deleteNote = () => {};

  return (
    <>
      <Header buttonFunction={addNote} />
      <div className="TodoContainer">
        {notes.map((value, index) => (
          <Note
            key={index}
            title={value.title}
            description={value.description}
            date={value.date}
          />
        ))}
      </div>
    </>
  );

  function SaveTodos(notes: NoteProps[]) {
    notes.length != 0
      ? localStorage.setItem("notes", JSON.stringify(notes))
      : 0;
  }

  function LoadTodos() {
    let notes: NoteProps[] | null = null;
    const fileContent: string | null = localStorage.getItem("notes");
    if (fileContent != null) {
      notes = JSON.parse(fileContent);
    }
    if (notes != null) {
      setNotes(notes);
    }
    console.log("Loaded");
  }
}

export default App;
