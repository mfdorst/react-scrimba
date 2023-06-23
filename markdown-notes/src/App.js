import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"

const LS_NOTES_KEY = "notes"
const LS_CURRENT_NOTE_ID_KEY = "current-note"

export default function App() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem(LS_NOTES_KEY)) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(() =>
        localStorage.getItem(LS_CURRENT_NOTE_ID_KEY) || (notes[0] && notes[0].id) || ""
    )

    React.useEffect(
        () => localStorage.setItem(LS_NOTES_KEY, JSON.stringify(notes)),
        [notes]
    )
    React.useEffect(
        () => localStorage.setItem(LS_CURRENT_NOTE_ID_KEY, currentNoteId),
        [currentNoteId]
    )

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        // Put the most recently modified note at the top
        setNotes(oldNotes => {
            const index = oldNotes.findIndex(note => note.id === currentNoteId)
            const [note] = oldNotes.splice(index, 1);
            note.body = text
            return [note, ...oldNotes]
        })
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}
