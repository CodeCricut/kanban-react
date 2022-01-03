import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from "@mui/material";
import { useModalService } from "../../services/modalService";
import { CloseDialogTitle } from "../shared/CloseDialogTitle";
import { Project } from "../../domain/project";
import { useFormState } from "./formState";
import { Form } from "./Form";

type ModalProps = {
    project: Project;
};

export const Modal = ({ project }: ModalProps) => {
    const formState = useFormState();

    const modalService = useModalService();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleCreate = async () => {
        const { name, description } = formState.values;
        // await addColumnToProject(project.id, name, description);
        modalService.unsetModal();
        console.dir(formState.values);
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Create new column
            </CloseDialogTitle>
            <DialogContent>
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
