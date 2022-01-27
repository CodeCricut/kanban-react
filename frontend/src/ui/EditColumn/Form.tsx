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
import formStyles from "../shared/formStyles";

export const Form = ({ state }: { state: FormState }) => {
    return (
        <Box sx={formStyles.form}>
            <FormControl sx={formStyles.labeledInput}>
                <Typography sx={formStyles.label}>Name</Typography>
                <TextField
                    sx={formStyles.inputLong}
                    value={state.values.name}
                    onChange={(e) => state.setName(e.target.value)}
                />
            </FormControl>
            <FormControl sx={formStyles.form}>
                <Typography sx={formStyles.label}>Description</Typography>
                <TextField
                    sx={formStyles.inputLong}
                    value={state.values.description}
                    onChange={(e) => state.setDescription(e.target.value)}
                />
            </FormControl>
        </Box>
    );
};
