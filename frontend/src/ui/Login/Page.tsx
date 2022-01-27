import { Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../application/login/hook';
import { useRegister } from '../../application/register/hook';
import { Form } from './Form'
import { useFormState } from './formState'
import {SxProps} from "@mui/system"

type StylesType = SxProps & {
    buttons: SxProps
}
const styles: StylesType = {
    width: {
        xs: 1,
        sm: "50%"
    },
    display: "flex", 
    flexDirection: "column",
    alignItems: "start",
    buttons :{
        width: 300
    },
    "& > *": {
        marginBottom: 1
    }
}


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
        <Container sx={styles}>
            <Typography sx={{color: "error.main"}} hidden={!error}>Invalid form values</Typography>
            <Form state={formState}/>
            <Typography>New here? <Link to="/register">Register</Link> instead.</Typography>
            <Button sx={styles.buttons} onClick={handleLogin} disabled={formState.invalid} variant="contained">Login</Button>
        </Container>
    )
}
