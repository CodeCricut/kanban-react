import { useMemo, useState } from "react";
import { Issue } from "../../domain/issue";

export type FormValues = {
    username: string;
    email: string;
    password: string;
};

export type FormState = {
    values: FormValues;
    invalidUsername: boolean;
    invalidEmail: boolean;
    invalidPassword: boolean;
    invalid: boolean;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    triedInvalid: boolean;
    setTriedInvalid: (tried: boolean) => void;
};

function isEmailValid(email: string): boolean {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
}

export function useFormState(): FormState {
    const [values, setValues] = useState<FormValues>({
        username: "",
        email: "",
        password: "",
    });
    const [triedInvalid, setTriedInvalid] = useState(false);

    const setUsername = (username: string) =>
        setValues({ ...values, username });
    const setEmail = (email: string) => setValues({ ...values, email });
    const setPassword = (password: string) =>
        setValues({ ...values, password });

    const invalidUsername = useMemo(() => !values.username, [values]);
    const invalidEmail = useMemo(() => !isEmailValid(values.email), [values]);
    const invalidPassword = useMemo(() => values.password.length < 6, [values]);
    const invalid = useMemo(
        () => invalidUsername || invalidEmail || invalidPassword,
        [values]
    );
    return {
        values: values,
        setUsername,
        setEmail,
        setPassword,
        invalidUsername,
        invalidEmail,
        invalidPassword,
        invalid,
        triedInvalid,
        setTriedInvalid,
    };
}
