import React from 'react';

const NotesSection = ({ note }) => {

    const notes = String(note)
  // Splitting notes into an array based on newlines
  const notesArray = notes.split('\n').filter(note => note.trim() !== '');

  return (
    <div className = "">
      <ul>
        {notesArray.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;