import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { NewDeck } from "@/model/NewDeck";
import { LanguageInput } from "@/shared/components/LanguageInput"
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { Language } from "@/model/Language";
import { Controller, useForm } from "react-hook-form";

interface FormFields {
    name: string;
    language: Language | undefined;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (deck: NewDeck) => void;
}

export const AddDeckForm: React.FC<Props> = ({ formRef, onSubmit }) => {
    const { isFetching: languagesLoading, data: languages } = useLanguages();
    const { handleSubmit, control, register, formState: { errors }} = useForm<FormFields>({defaultValues: { name: '', language: undefined },});

    function onFormSubmit(data: FormFields) {
        onSubmit({ name: data.name, languageId: data.language!.id } as NewDeck);
    }

    return <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <FormControl isInvalid={!!errors.name}>
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