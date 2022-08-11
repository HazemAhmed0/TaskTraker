import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDwv8LR0H-le2AAQYNqzWBjBWYgw_WwmIs",
  authDomain: "task-tracker-865c6.firebaseapp.com",
  projectId: "task-tracker-865c6",
  storageBucket: "task-tracker-865c6.appspot.com",
  messagingSenderId: "603745298529",
  appId: "1:603745298529:web:fe2602420ab620a57ce220",
  measurementId: "G-900YPRB4N6"
})

export const auth = app.auth()
export default app