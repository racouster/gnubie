import { useEffect } from 'react';
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.util";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
    useEffect(() => {
        const getRedirectResponse = async () => {
            await getRedirectResult(auth);
        }
        getRedirectResponse();
    }, []);


    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;