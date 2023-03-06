import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC3FHnaQAEVq5IA72gicnYlFOV8XQgz1OU",
    authDomain: "gnubiewebtest.firebaseapp.com",
    projectId: "gnubiewebtest",
    storageBucket: "gnubiewebtest.appspot.com",
    messagingSenderId: "206307417592",
    appId: "1:206307417592:web:cc58a170776d9c8c550a0d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const authProvider = new GoogleAuthProvider();
authProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, authProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, authProvider);

const db = getFirestore();

export const createUserDocumentFormAuth = async (userAuth) => {
    const userDocRef = await doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date(); 
        try {
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creating the user:', error.message)
        }
    }

    return userDocRef;
}