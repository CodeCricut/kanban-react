import { useState } from "react";
import { Column } from "../../domain/column";

export type FormValues = {
    name: string;
    description: string;
};

/**
 * Form state for editing a column
 */
export type FormState = {
    values: FormValues;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
};

/**
 * Use the state for editing a column.
 */
export function useFormState(column: Column): FormState {
    const [values, setValues] = useState<FormValues>({
        name: column.name ?? "",
        description: column.description ?? "",
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
