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
                <Typography>Username</Typography>
                <TextField
                    required
                    error={state.invalidUsername}
                    value={state.values.username}
                    onChange={(e) => state.setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <Typography>Email</Typography>
                <TextField
                    type="email"
                    error={state.invalidEmail}
                    required
                    value={state.values.email}
                    onChange={(e) => state.setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <Typography>Password</Typography>
                <TextField
                    type="password"
                    error={state.invalidPassword}
                    required
                    value={state.values.password}
                    onChange={(e) => state.setPassword(e.target.value)}
                />
            </FormControl>
        </Box>
    );
};
