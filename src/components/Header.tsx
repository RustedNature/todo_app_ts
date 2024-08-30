import React, { useState } from "react";
interface HeaderProps {
  buttonFunction: (title: string, description: string, date: Date) => void;
}

const Header: React.FC<HeaderProps> = ({ buttonFunction }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const headerStyle: React.CSSProperties = {
    border: "solid 1px gray",
    padding: "20px",
    borderRadius: "8px",
    gap: "10px",
  };
  const inputStyle: React.CSSProperties = {
    display: "flex",
    padding: "20px",
    gap: "10px",
  };

  return (
    <div style={headerStyle}>
      <div style={inputStyle}>
        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>Description</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Erledigen bis</p>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => buttonFunction(title, description, new Date(date))}
        >
          Todo Hinzufügen
        </button>
      </div>
    </div>
  );
};

export default Header;
