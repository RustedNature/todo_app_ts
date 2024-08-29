import React from "react";

interface NoteProps {
  id: number;
  title: string;
  description: string;
  date: string;
  deleteFunction: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  title,
  description,
  date,
  deleteFunction,
}) => {
  return (
    <div className="Note">
      <button onClick={() => deleteFunction(id)}>Löschen</button>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
};

export default Note;
