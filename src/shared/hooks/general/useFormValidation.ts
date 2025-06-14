import { useState } from "react";
import { FormErrors } from "@/model/FormErrors";
import { camelCaseToTitleCase } from "@/shared/utils/caseConverters";

export function useFormValidation<T extends Record<string, any>>() {
    const [errors, setErrors] = useState<FormErrors<T>>({});

    function isValid(formFields: T): boolean {
        const newErrors: FormErrors<T> = {};

        Object.entries(formFields).forEach(([key, value]) => {
            if (typeof value === "string" && !value.trim()) {
                newErrors[key as keyof T] = `${camelCaseToTitleCase(key)} is required`;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return false;
        }

        return true;
    }

    return { isValid, errors };
}