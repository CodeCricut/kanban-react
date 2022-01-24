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
import { useAddColumn } from "../../application/addColumn/hook";

type ModalProps = {
    project: Project;
};

export const Modal = ({ project }: ModalProps) => {
    const formState = useFormState();

    const modalService = useModalService();
    const addColumn = useAddColumn();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleCreate = async () => {
        await addColumn(project, formState.values);
        modalService.unsetModal();
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
