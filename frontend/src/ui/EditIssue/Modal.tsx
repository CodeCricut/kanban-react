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
import { useEditIssue } from "../../application/editIssue/hook";
import { Issue } from "../../domain/issue";
import { useFormState } from "./formState";
import { Form } from "./Form";
import { useDeleteIssue } from "../../application/deleteIssue/hook";
import modalStyles from "../shared/modalStyles";

type ModalProps = {
    issue: Issue;
    projectId: string;
};
export const Modal = ({ issue, projectId }: ModalProps) => {
    const formState = useFormState(issue);

    const modalService = useModalService();
    const editIssue = useEditIssue();
    const deleteIssue = useDeleteIssue();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleEdit = async () => {
        await editIssue(issue.id ?? "", projectId, formState.values);
        modalService.unsetModal();
    };

    const handleDelete = async () => {
        await deleteIssue(issue.id ?? "", projectId);
        modalService.unsetModal();
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Edit issue
            </CloseDialogTitle>
            <DialogContent sx={modalStyles.modalContent}>
                <Form state={formState} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} variant="outlined" color="error">
                    Delete
                </Button>
                <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};
