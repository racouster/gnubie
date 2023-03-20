import { useEffect } from 'react'
import { getRedirectResult } from "firebase/auth"
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth    
 } from "../../utils/firebase/firebase.util"
 import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
 import Button from '../../components/button/button.component'

const SignIn = () => {
    useEffect(() => {
        const getRedirectResponse = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = createUserDocumentFromAuth(response.user);
            }
        }
        getRedirectResponse();
    }, []);

    const handleSignInWithPopup = async (event) => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSignInWithRedirect = async (event) => {
        const response = signInWithGoogleRedirect();
        console.log(response);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <Button onClick={handleSignInWithPopup} buttonType='google'>Sign in with Google Popup</Button>
            <Button onClick={handleSignInWithRedirect} buttonType='google'>Sign in with Google Redirect</Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;