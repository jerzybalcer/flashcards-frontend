import { useState } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { NewDeck } from "@/model/NewDeck";
import { LanguageInput } from "@/shared/components/LanguageInput"
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { FormErrors } from "@/model/FormErrors";

interface FormFields {
    name?: string;
    languageId?: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (deck: NewDeck) => void;
}

export const AddDeckForm: React.FC<Props> = ({ formRef, onSubmit }) => {
    const { isFetching: languagesLoading, data: languages } = useLanguages();

    const [deck, setDeck] = useState<FormFields>({} as FormFields);
    const [errors, setErrors] = useState<FormErrors<FormFields>>({});

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newErrors: FormErrors<FormFields> = {};

        if(!deck.name?.trim()) newErrors.name = 'Name is required';
        if(!deck.languageId) newErrors.languageId = 'Language is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(deck as NewDeck);
    }

    return <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input value={deck.name ?? ''} onChange={(event) => setDeck({...deck, name: event.currentTarget.value})}/>
            <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl my={4} isRequired isInvalid={!!errors.languageId}>
            <FormLabel>Language</FormLabel>
            <LanguageInput languages={languages ?? []} isLoading={languagesLoading} onChange={(language) => setDeck({...deck, languageId: language?.id})} />
            <FormErrorMessage>{errors.languageId}</FormErrorMessage>
        </FormControl>
    </form>
}