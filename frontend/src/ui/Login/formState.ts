import { useMemo, useState } from "react";
import { Issue } from "../../domain/issue";

export type FormValues = {
    username: string;
    password: string;
};

export type FormState = {
    values: FormValues;
    invalidUsername: boolean;
    invalidPassword: boolean;
    invalid: boolean;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    triedInvalid: boolean;
    setTriedInvalid: (tried: boolean) => void
};

export function useFormState(): FormState {
    const [values, setValues] = useState<FormValues>({
        username: "",
        password: ""
    });
    const [triedInvalid, setTriedInvalid] = useState(false)

    const setUsername = (username: string) => setValues({ ...values, username });
    const setPassword = (password: string) => setValues({ ...values, password });

    const invalidUsername = useMemo(() => !values.username, [values])
    const invalidPassword = useMemo(() => values.password.length < 6, [values])
    const invalid = useMemo(() => invalidUsername || invalidPassword , [values])
    return {
        values: values,
        setUsername,
        setPassword,
        invalidUsername,
        invalidPassword,
        invalid,
        triedInvalid,
        setTriedInvalid
    };
}
