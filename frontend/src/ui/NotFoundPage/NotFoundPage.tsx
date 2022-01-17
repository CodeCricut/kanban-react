import { Container, Typography } from "@mui/material";
import React from "react";

export const NotFoundPage = () => {
    return (
        <Container sx={{textAlign: "center", padding: 5}}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h5">Page not found</Typography>
        </Container>
    );
};
