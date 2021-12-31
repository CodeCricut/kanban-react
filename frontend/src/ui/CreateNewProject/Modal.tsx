import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from "@mui/material";
import { Form } from "./Form";
import { CloseDialogTitle } from "../shared/CloseDialogTitle";

export const Modal = () => {
    const handleCancel = () => {
        console.log("cancel");
    };

    const handleCreate = () => {
        console.log("create");
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Create new project
            </CloseDialogTitle>
            <DialogContent>
                <Form />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
