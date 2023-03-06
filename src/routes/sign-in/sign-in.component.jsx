import { signInWithGooglePopup, createUserDocumentFormAuth } from "../../utils/firebase/firebase.util"


const SignIn = () => {

    const handleSignIn = async (event) => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFormAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn}>Sign in with Google Popup</button>
        </div>
    )
}

export default SignIn