import { Button, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../application/register/hook";
import { Form } from "./Form";
import { useFormState } from "./formState";

type StylesType = SxProps & {
    buttons: SxProps;
};
const styles: StylesType = {
    width: {
        xs: 1,
        sm: "40%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    buttons: {
        width: 1,
    },
    "& > *": {
        marginBottom: 1,
    },
};

export const RegisterPage = () => {
    const register = useRegister();
    const navigate = useNavigate();

    const [error, setError] = useState<boolean>(false);
    const formState = useFormState();

    const handleRegister = async () => {
        if (formState.invalid) {
            formState.setTriedInvalid(true);
            setError(true);
        } else {
            setError(false);
            const { username, email, password } = formState.values;
            const success: boolean = await register(username, email, password);
            if (success) navigate("/me");
            else setError(true);
        }
    };
    return (
        <Container sx={styles}>
            <Typography variant="h2">Register</Typography>
            <Typography sx={{ color: "error.main" }} hidden={!error}>
                Invalid form values
            </Typography>
            <Form state={formState} />
            <Typography>
                Already have an account? <Link to="/login">Login</Link> instead.
            </Typography>
            <Button
                sx={styles.buttons}
                onClick={handleRegister}
                disabled={formState.invalid && formState.triedInvalid}
                variant="contained"
            >
                Register
            </Button>
        </Container>
    );
};
