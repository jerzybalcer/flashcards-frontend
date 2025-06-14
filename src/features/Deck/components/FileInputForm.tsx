import { Alert, AlertIcon, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FileInput } from "../../../shared/components/FileInput";
import { useState } from "react";
import { useFormValidation } from "@/shared/hooks/general/useFormValidation";
import { FlashCardsFile } from "@/model/FlashCardsFile";

interface FormFields {
    file?: File;
    delimiter?: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (file: FlashCardsFile) => void;
}

export const FileInputForm: React.FC<Props> = ({ formRef, onSubmit }) => {
    const [file, setFile] = useState<FormFields>({});
    const { errors, isValid } = useFormValidation<FormFields>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(isValid(file)){
            onSubmit(file as FlashCardsFile);
            setFile({ delimiter: '-' });
        }
    }
    
    return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <Flex direction='column' gap={6}>
            <Alert status='info'>
                <AlertIcon />
                Put each word pair in a new line. Separate the pair by a delimiter set below.
            </Alert>

            <FormControl isRequired isInvalid={!!errors.file}>
                <FormLabel>File</FormLabel>
                <FileInput onChange={(currentFile) => setFile({...file, file: currentFile})}/>
                <FormErrorMessage>{errors.file}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.delimiter}> 
                <FormLabel>Delimiter</FormLabel>
                <Input value={file?.delimiter ?? ''} maxLength={1} onChange={(event) => setFile({...file, delimiter: event.currentTarget.value})}/>
                <FormErrorMessage>{errors.delimiter}</FormErrorMessage>
            </FormControl>
        </Flex>
    </form>);
}