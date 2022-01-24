import { DialogContent, DialogActions, Dialog, Button } from "@mui/material";

import { CloseDialogTitle } from "../shared/CloseDialogTitle";
import { useModalService } from "../../services/modalService";
import { Project } from "../../domain/project";
import { useFormState } from "./formState";
import { Form } from "./Form";
import { useEditProject } from "../../application/editProject/hook";
import { useDeleteProject } from "../../application/deleteProject/hook";

type ModalDependencies = {
    project: Project;
};

export const Modal = ({ project }: ModalDependencies) => {
    if (!project.id) throw new Error("Must provide project with id");

    const formState = useFormState(project);

    const modalService = useModalService();
    const editProject = useEditProject();
    const deleteProject = useDeleteProject();

    const handleCancel = () => {
        modalService.unsetModal();
    };

    const handleEdit = async () => {
        await editProject(project.id ?? "", formState.values);
        modalService.unsetModal();
    };

    const handleDelete = async () => {
        await deleteProject(project.id ?? "");
        modalService.unsetModal();
    };

    return (
        <Dialog open>
            <CloseDialogTitle onClose={handleCancel}>
                Edit project
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
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
