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
import { Column } from "../../domain/column";
import { Project } from "../../domain/project";
import { useFormState } from "./formState";
import { Form } from "./Form";
import { useEditColumn } from "../../application/editColumn/hook";
import { useDeleteColumn } from "../../application/deleteColumn/hook";

type ModalProps = {
    column: Column;
    projectId: string;
};
export const Modal = ({ column, projectId }: ModalProps) => {
    const formState = useFormState(column);

    const modalService = useModalService();
    const editColumn = useEditColumn();
    const deleteColumn = useDeleteColumn();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleDelete = async () => {
        await deleteColumn(column.id ?? "", projectId);
        modalService.unsetModal();
    };

    const handleEdit = async () => {
        const { name, description } = formState.values;
        await editColumn(column.id ?? "", name, description, projectId);
        modalService.unsetModal();
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Edit column
            </CloseDialogTitle>
            <DialogContent>
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
