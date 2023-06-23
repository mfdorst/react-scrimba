import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBQyo4-db6Go9p7ROgyWruAcbe89PZS0I0",
  authDomain: "react-notes-1a71d.firebaseapp.com",
  projectId: "react-notes-1a71d",
  storageBucket: "react-notes-1a71d.appspot.com",
  messagingSenderId: "605123689662",
  appId: "1:605123689662:web:aa10e8882d132adbf932ef"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
