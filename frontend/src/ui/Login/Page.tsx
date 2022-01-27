import { Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../application/login/hook';
import { useRegister } from '../../application/register/hook';
import { Form } from './Form'
import { useFormState } from './formState'

export const LoginPage = () => {
    const login = useLogin()
    const navigate = useNavigate()

    const [error, setError] = useState<boolean>(false)
    const formState = useFormState();
    const handleLogin = async () => {
        setError(false)
        const {username, password} = formState.values
        const success: boolean = await login(username, password)
        if (success)
            navigate("/me")
        else setError(true)
    }
    return (
        <Container>
            <Typography sx={{color: "error.main"}} hidden={!error}>Invalid form values</Typography>
            <Form state={formState}/>
            <Button onClick={handleLogin} disabled={formState.invalid}>Login</Button>
        </Container>
    )
}
