import React from "react";
import {
    Box,
    FormControl,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";

export const Form = () => {
    return (
        <Box>
            <FormControl>
                <Typography>Name</Typography>
                <TextField />
            </FormControl>
            <FormControl>
                <Typography>Description</Typography>
                <TextField />
            </FormControl>
        </Box>
    );
};
