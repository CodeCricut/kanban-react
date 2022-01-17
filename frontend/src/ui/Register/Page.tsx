import { Button } from '@mui/material';
import React from 'react'
import { Form } from './Form'
import { useFormState } from './formState'

export const RegisterPage = () => {
    const formState = useFormState();
    const handleRegister = () => {
        console.log("register")
        console.dir(formState.values)
    }
    return (
        <div>
            <Form state={formState}/>
            <Button onClick={handleRegister} disabled={formState.invalid}>Register</Button>
        </div>
    )
}
