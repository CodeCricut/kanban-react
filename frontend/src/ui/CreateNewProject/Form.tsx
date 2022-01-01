import React from "react";
import {
    Box,
    FormControl,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { FormState } from "./formState";

export const Form = ({ state }: { state: FormState }) => {
    return (
        <Box>
            <FormControl>
                <Typography>Name</Typography>
                <TextField
                    value={state.values.name}
                    onChange={(e) => state.setName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <Typography>Description</Typography>
                <TextField
                    value={state.values.description}
                    onChange={(e) => state.setDescription(e.target.value)}
                />
            </FormControl>
        </Box>
    );
};
