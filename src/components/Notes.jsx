import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './addNote';
import { Navigate, useNavigate } from 'react-router-dom';

function Notes(props) {
    const context = useContext(noteContext);
    let navigate=useNavigate()
    const [note, setNote] = useState({ id: "", etitle: '', edescription: '', etag: '' })
    const { notes, getNotes, addNote, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click(); // open modal
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });

    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log('updating the note', note)
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); // close modal after saving
    };
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input value={note.etitle} type="email" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input value={note.edescription} type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input value={note.etag} type="text" className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1>Your Notes</h1>
                {notes.length == 0 && 'No notes to show'}
                <div className="row">
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes