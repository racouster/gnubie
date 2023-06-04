import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util'

import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayname: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const [validationErrors, setValidationErrors] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();

        let newErrors = [];

        if (password !== confirmPassword) {
            newErrors.push('Password doesn\'t match confirmation password.');
        }
        
        const minPassLength = 6;
        if (password.length < minPassLength) {
            newErrors.push(`Password is too short. At least ${minPassLength} letters, numbers and symbols.`);
        }

        if (newErrors.length) {
            setValidationErrors(newErrors);
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            if (user) {
                const userDocRef = await createUserDocumentFromAuth(user, { displayName });
                console.log(userDocRef);
                
                resetFormFields();
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use')
                newErrors.push('Email address already in use.')
            
            console.log(['User could not be created', error]);
        }
        setValidationErrors(newErrors);
    }

    return (
        <div className="sign-up-form-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            {validationErrors.length ?
                <ul>
                 {validationErrors.map(v => (<li key={v}>{v}</li>))}
                </ul> 
            : 
                <></>}
            <form name="sign-up" onSubmit={handleSubmit}>
                <FormInput label='Display Name' name='displayName' type='text' required onChange={handleChange} value={displayName}/>
                
                <FormInput label='Email' name='email' type='email' required onChange={handleChange} value={email}/>

                <FormInput label='Password' name='password' type='password' required onChange={handleChange} value={password}/>

                <FormInput label='Confirm Password' name='confirmPassword' type='password' required onChange={handleChange} value={confirmPassword}/>

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;