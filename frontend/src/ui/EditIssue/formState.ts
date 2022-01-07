import { useState } from "react";
import { Issue } from "../../domain/issue";

export type FormValues = {
    name: string;
    description: string;
};

export type FormState = {
    values: FormValues;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
};

export function useFormState(issue: Issue): FormState {
    const [values, setValues] = useState<FormValues>({
        name: issue.name ?? "",
        description: issue.description ?? "",
    });

    const setName = (name: string) => setValues({ ...values, name });
    const setDescription = (description: string) =>
        setValues({ ...values, description });

    return {
        values: values,
        setName,
        setDescription,
    };
}
