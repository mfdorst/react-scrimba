import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    const DEBOUNCE_DELAY_MS = 500

    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [workingNoteText, setWorkingNoteText] = React.useState("")

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    notes.sort((a, b) => b.updatedAt - a.updatedAt)

    React.useEffect(() => {
        // Return the onSnapshot cleanup function to close the connection when the page closes
        return onSnapshot(notesCollection, snapshot => {
            const notes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notes)
        })
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if (currentNote) {
            setWorkingNoteText(currentNote.body)
        }
    }, [currentNote])

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (workingNoteText !== currentNote.body) {
                updateNote(workingNoteText)
            }
        }, DEBOUNCE_DELAY_MS)
        return () => clearTimeout(timeoutId)
    }, [workingNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(body) {
        const docRef = doc(db, "notes", currentNoteId)
        // Use { merge: true } to not clobber the rest of the document
        await setDoc(docRef, { body, updatedAt: Date.now() }, { merge: true })
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
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
                            currentNoteId={currentNoteId}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            currentNoteText={workingNoteText}
                            updateNoteText={setWorkingNoteText}
                        />
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
