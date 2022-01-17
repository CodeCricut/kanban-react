import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../application/register/hook';
import { Form } from './Form'
import { useFormState } from './formState'

export const RegisterPage = () => {
    const register = useRegister()
    const navigate = useNavigate()

    const [error, setError] = useState<boolean>(false)
    const formState = useFormState();
    const handleRegister = async () => {
        setError(false)
        const {username, email, password} = formState.values
        const success: boolean = await register(username, email, password)
        setError(!success)
        navigate("/me")
    }
    return (
        <div>
            <Typography sx={{color: "error.main"}} hidden={!error}>Invalid form values</Typography>
            <Form state={formState}/>
            <Button onClick={handleRegister} disabled={formState.invalid}>Register</Button>
        </div>
    )
}
