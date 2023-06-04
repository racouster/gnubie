import { useState } from "react";
import {
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    signInWithGoogleEmailAndPassword,
} from "../../utils/firebase/firebase.util"

import Button from '../../components/button/button.component'
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // TODO: Sign out? if signing in? What if accounts differ?
        try {
            await signInWithGoogleEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password.')
                    break;
                case 'auth/user-not-found':
                    alert('User does not exist.')
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
        return false;
    }
    
    const handleSignInWithPopup = async (event) => {
        await signInWithGooglePopup();
    }
    
    // const handleSignInWithRedirect = async (event) => {
    //     signInWithGoogleRedirect();
    // }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form name="sign-in" onSubmit={handleSubmit}>
                <FormInput label='Email' name='email' type='email' required onChange={handleChange} value={email} />
                <FormInput label='Password' name='password' type='password' required onChange={handleChange} value={password} />
                <div className="buttons-container">
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' onClick={handleSignInWithPopup} buttonType='google'>Sign in with Google Popup</Button>
                    {/* <Button onClick={handleSignInWithRedirect} buttonType='google'>Sign in with Google Redirect</Button> */}
                </div>
            </form>
        </div>
    )
}

export default SignInForm;