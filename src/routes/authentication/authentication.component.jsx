import { useEffect } from 'react'
import { getRedirectResult } from "firebase/auth"
import { 
    auth,
    createUserDocumentFromAuth    
 } from "../../utils/firebase/firebase.util"
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

const Authentication = () => {
    useEffect(() => {
        const getRedirectResponse = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = createUserDocumentFromAuth(response.user);
            }
        }
        getRedirectResponse();
    }, []);


    return (
        <div>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;