import { useState } from "react";

export type FormValues = {
    name: string;
    description: string;
};

/**
 * Form state for creating a new column
 */
export type FormState = {
    values: FormValues;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
};

/**
 * Use the state for creating a new column.
 */
export function useFormState(): FormState {
    const [values, setValues] = useState<FormValues>({
        name: "",
        description: "",
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
