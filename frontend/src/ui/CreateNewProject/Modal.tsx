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
import { useCreateProject } from "../../application/createProject/hook";

export const Modal = () => {
    const createProject = useCreateProject();

    const handleCancel = () => {
        console.log("cancel");
    };

    const handleCreate = async () => {
        const created = await createProject("test name", "test description");
        console.dir(created);
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
