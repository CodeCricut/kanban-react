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
import formStyles from "../shared/formStyles"

export const Form = ({ state }: { state: FormState }) => {
    return (
        <Box sx={formStyles.form}>
            <FormControl sx={formStyles.labeledInput}>
                <Typography sx={formStyles.label}>Username</Typography>
                <TextField
                    sx={formStyles.inputLong}
                    required
                    error={state.invalidUsername && state.triedInvalid}
                    value={state.values.username}
                    onChange={(e) => state.setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl sx={formStyles.labeledInput}>
                <Typography sx={formStyles.label}>Password</Typography>
                <TextField
                sx={formStyles.inputLong}
                    type="password"
                    error={state.invalidPassword  && state.triedInvalid}
                    required
                    value={state.values.password}
                    onChange={(e) => state.setPassword(e.target.value)}
                />
            </FormControl>
        </Box>
    );
};
