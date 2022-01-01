import { useState } from "react";
import { Project } from "../../domain/project";

export type FormValues = {
    name: string;
    description: string;
};

/**
 * Form state for editing an existing project.
 */
export type FormState = {
    values: FormValues;
    originalProject: Project;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
};

/**
 * Use the state for editing an existing project
 */
export function useFormState(project: Project): FormState {
    const [values, setValues] = useState<FormValues>({
        name: project.name ?? "",
        description: project.description ?? "",
    });

    const setName = (name: string) => setValues({ ...values, name });
    const setDescription = (description: string) =>
        setValues({ ...values, description });

    return {
        originalProject: project,
        values: values,
        setName,
        setDescription,
    };
}
