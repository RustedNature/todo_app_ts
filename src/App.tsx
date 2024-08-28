import { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note";
import Header from "./Header";

function App() {
  interface NoteProps {
    id: number;
    title: string;
    description: string;
    date: string;
    deleteFunction(id: number): void;
  }
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const LoadTodos = () => {
      let num: number = id;
      const fileContent: string | null = localStorage.getItem("notes");
      if (fileContent) {
        const loadedNotes: NoteProps[] = JSON.parse(fileContent);
        if (loadedNotes && loadedNotes.length !== 0) {
          setNotes(loadedNotes);
          num = setHighestId(loadedNotes);
        }
      }

      console.log("Loaded\nHighest Id is:");
      console.log(num);
    };
    LoadTodos();
  }, []);

  useEffect(() => {
    const SaveTodos = (notes: NoteProps[]) => {
      localStorage.setItem("notes", JSON.stringify(notes));
    };
    SaveTodos(notes);
  }, [notes]);

  const addNote = (title: string, description: string, date: string) => {
    const newid: number = id + 1;
    setId(newid);
    setNotes([
      ...notes,
      {
        id: newid,
        title: title,
        description: description,
        date: date,
        deleteFunction: () => DeleteNote(newid),
      },
    ]);
    console.log(notes);
  };

  function DeleteNote(id: number) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  return (
    <>
      <Header buttonFunction={addNote} />
      <div className="TodoContainer">
        {notes.map((note) => (
          <Note
            id={note.id}
            key={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            deleteFunction={DeleteNote}
          />
        ))}
      </div>
    </>
  );

  function setHighestId(notes: NoteProps[]) {
    let num: number = Math.max(...notes.map((note) => note.id));
    setId(num);
    return num;
  }
}

export default App;
