import React from "react"

export default function Sidebar(props) {
    const { currentNote, setCurrentNoteId, newNote, deleteNote } = props

    const noteElements = props.notes.map((note) => {

        const selectedNote = note.id === currentNote.id ? "selected-note" : ""

        return (
            <div key={note.id}>
                <div
                    className={`title ${selectedNote}`}
                    onClick={() => setCurrentNoteId(note.id)}
                >
                    <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
                    <button className="delete-btn" onClick={event => deleteNote(event, note.id)}>
                        <i className="gg-trash trash-icon"></i>
                    </button>
                </div>
            </div>
        );
    }
    )

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
