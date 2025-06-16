import { useEffect } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form";
import { NewDeck } from "@/model/NewDeck";
import { LanguageInput } from "@/shared/components/LanguageInput"
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { Language } from "@/model/Language";
import { Deck } from "@/model/Deck";
import { EditedDeck } from "@/model/EditedDeck";

interface FormFields {
    name: string;
    language: Language | undefined;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    defaultValue?: Deck;
    onSubmit: (deck: NewDeck | EditedDeck) => void;
}

export const AddDeckForm: React.FC<Props> = ({ formRef, onSubmit, defaultValue }) => {
    const { isFetching: languagesLoading, data: languages } = useLanguages();
    const { handleSubmit, control, register, reset, formState: { errors }} = useForm<FormFields>(
        { 
            defaultValues: 
                { 
                    name: defaultValue?.name ?? '',
                    language: defaultValue ? { id: defaultValue.languageId, name: defaultValue.languageName } : undefined
                },
        });

    function onFormSubmit(data: FormFields) {
        let deck = { name: data.name, languageId: data.language?.id } as NewDeck;

        if(defaultValue){
            deck = { id: defaultValue.id, name: data.name, languageId: data.language?.id } as EditedDeck;
        }
        onSubmit(deck);
        reset();
    }

    useEffect(() => {
        reset()
    }, [defaultValue, reset]);

    return <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register("name", { required: "Name is required" })} placeholder="Enter name"/>
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={4} isRequired isInvalid={!!errors.language}>
            <FormLabel>Language</FormLabel>
            <Controller
                name="language"
                control={control}
                rules={{ required: "Language is required" }}
                render={({ field }) => (
                    <LanguageInput
                        languages={languages ?? []}
                        isLoading={languagesLoading}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <FormErrorMessage>{errors.language?.message}</FormErrorMessage>
        </FormControl>
    </form>
}