import { useEffect } from 'react'
import { getRedirectResult } from "firebase/auth"
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFormAuth
 } from "../../utils/firebase/firebase.util"


const SignIn = () => {
    useEffect(() => {
        const getRedirectResponse = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = createUserDocumentFormAuth(response.user);
            }
        }
        getRedirectResponse();
    }, []);

    const handleSignInWithPopup = async (event) => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFormAuth(user);
    }

    const handleSignInWithRedirect = async (event) => {
        const response = signInWithGoogleRedirect();
        console.log(response);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignInWithPopup}>Sign in with Google Popup</button>
            <button onClick={handleSignInWithRedirect}>Sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn