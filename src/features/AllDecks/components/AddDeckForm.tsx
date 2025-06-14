import { useState } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { NewDeck } from "@/model/NewDeck";
import { LanguageInput } from "@/shared/components/LanguageInput"
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { useFormValidation } from "@/shared/hooks/general/useFormValidation";

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
    const { errors, isValid } = useFormValidation<FormFields>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(isValid(deck)){
            onSubmit(deck as NewDeck);
        }
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