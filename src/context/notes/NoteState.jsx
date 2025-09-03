import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      // Optionally, show a user-friendly message or handle error state
    }
  };
  

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note=await response.json()
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    console.log('Deleting the note with id : ', id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    props.showAlert('Note deleted successfully','success')
  }


  // Edit a Note
  // Api call
  const editNote = async (id, title, description, tag) => {
    // Api call
    console.log(id)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json =await response.json();
    console.log(json)


    let newNotes=JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
        break;
      }
    }
    props.showAlert('Updated Successfully','success')
    setNotes(newNotes)

  }
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
