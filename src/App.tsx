import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import Header from "./components/Header";

function App() {
  interface NoteProps {
    id: number;
    title: string;
    description: string;
    date: Date;
  }
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const LoadTodos = () => {
      let num: number = id;
      const fileContent: string | null = localStorage.getItem("notes");
      if (fileContent) {
        const loadedNotes: NoteProps[] = JSON.parse(fileContent, (key, value) =>
          key === "date" ? new Date(value) : value
        );
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

    SaveTodos(sortNotesByDate());
  }, [notes]);

  const addNote = (title: string, description: string, date: Date) => {
    const newid: number = id + 1;
    setId(newid);
    setNotes([
      ...notes,
      {
        id: newid,
        title: title,
        description: description,
        date: date,
      },
    ]);
    console.log(notes);
  };

  const sortNotesByDate = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      const now: number = Date.now();
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);
      const diffA = Math.abs(dateA.getTime() - now);
      const diffB = Math.abs(dateB.getTime() - now);

      return diffA - diffB;
    });
    console.log("Sorted?");
    console.log(sortedNotes);
    return sortedNotes;
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

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
            deleteFunction={() => {
              deleteNote(note.id);
            }}
          />
        ))}
      </div>
    </>
  );

  function setHighestId(notes: NoteProps[]) {
    const num: number = Math.max(...notes.map((note) => note.id));
    setId(num);
    return num;
  }
}

export default App;
