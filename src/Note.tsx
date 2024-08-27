import React from "react";

interface NoteProps {
  title: string;
  description: string;
  date: string;
}

const Note: React.FC<NoteProps> = ({ title, description, date }) => {
  return (
    <div className="Note">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
};

export default Note;
