import React from "react"

export default function Sidebar({
    notes,
    currentNoteId,
    setCurrentNoteId,
    newNote,
    deleteNote,
}) {
    const noteElements = notes.map(note => (
        <div key={note.id}>
            <div

                className={`title ${note.id === currentNoteId ? "selected-note" : ""}`}
                onClick={() => setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

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
