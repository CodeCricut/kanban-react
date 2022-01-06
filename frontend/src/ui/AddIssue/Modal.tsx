import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from "@mui/material";
import { useModalService } from "../../services/modalService";
import { useAddIssueToColumn } from "../../application/addIssueToColumn/hook";
import { Column } from "../../domain/column";
import { CloseDialogTitle } from "../shared/CloseDialogTitle";
import { Form } from "./Form";
import { useFormState } from "./formState";

type ModalProps = {
    column: Column;
};
export const Modal = ({ column }: ModalProps) => {
    const formState = useFormState();

    const modalService = useModalService();
    const addIssueToColumn = useAddIssueToColumn();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleCreate = async () => {
        const { name, description } = formState.values;
        await addIssueToColumn(column, name, description);
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
