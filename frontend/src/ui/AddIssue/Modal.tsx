import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from "@mui/material";
import { useModalService } from "../../services/modalService";
import { Column } from "../../domain/column";
import { CloseDialogTitle } from "../shared/CloseDialogTitle";
import { Form } from "./Form";
import { useFormState } from "./formState";
import { useAddIssue } from "../../application/addIssue/hook";
import { Project } from "../../domain/project";

type ModalProps = {
    project: Project;
    column: Column;
};
export const Modal = ({ project, column }: ModalProps) => {
    const formState = useFormState();

    const modalService = useModalService();
    const addIssue = useAddIssue();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleCreate = async () => {
        await addIssue(project, column, formState.values);
        modalService.unsetModal();
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Create new issue
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
