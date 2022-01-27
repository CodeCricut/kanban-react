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
import { useModalService } from "../../services/modalService";
import { useFormState } from "./formState";
import modalStyles from "../shared/modalStyles";

export const Modal = () => {
    const formState = useFormState();

    const modalService = useModalService();
    const createProject = useCreateProject();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleCreate = async () => {
        await createProject(formState.values);
        modalService.unsetModal();
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Create new project
            </CloseDialogTitle>
            <DialogContent sx={modalStyles.modalContent}>
                <Form state={formState} />
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
