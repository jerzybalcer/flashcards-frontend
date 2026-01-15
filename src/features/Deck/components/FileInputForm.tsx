import { Alert, AlertIcon, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { FileInput } from "../../../shared/components/FileInput";
import { FlashCardsFile } from "@/model/FlashCardsFile";

interface FormFields {
    file?: File;
    delimiter: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (file: FlashCardsFile) => void;
}

export const FileInputForm: React.FC<Props> = ({ formRef, onSubmit }) => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormFields>({
        defaultValues: {
            file: undefined,
            delimiter: "-"
        }
      });

    function onFormSubmit(data: FormFields) {
        onSubmit(data as FlashCardsFile);
        reset();
    }
    
    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <Flex direction='column' gap={6}>
            <Alert status='info'>
                <AlertIcon />
                Put each word pair in a new line. Separate the pair by a delimiter set below.
            </Alert>

            <FormControl isRequired isInvalid={!!errors.file}>
                <FormLabel>File</FormLabel>
                <Controller
                    name="file"
                    control={control}
                    rules={{ required: "File is required" }}
                    render={({ field }) => (
                        <FileInput
                            onChange={(file) => field.onChange(file)}
                        />
                    )}
                />
                <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.delimiter}> 
                <FormLabel>Delimiter</FormLabel>
                <Input
                    maxLength={1}
                    placeholder="Enter delimiter"
                    {...register("delimiter", { required: "Delimiter is required" })}
                />
                <FormErrorMessage>{errors.delimiter?.message}</FormErrorMessage>
            </FormControl>
        </Flex>
    </form>);
}