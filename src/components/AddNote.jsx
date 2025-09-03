import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: '', description: '', tag: '' })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title:"",description:'',tag:''})
        props.showAlert('Note added successfully','success')
    }
    // Why we use spread operator
    // const [notes, setNotes] = useState([]);

    // const addNote = (note) => {
    //   setNotes([...notes, note]); // Add new note without changing original array
    // };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} />
                </div>
                <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote