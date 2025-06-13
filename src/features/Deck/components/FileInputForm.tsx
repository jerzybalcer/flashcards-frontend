import { Alert, AlertIcon, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FileInput } from "../../../shared/components/FileInput";
import { useState } from "react";
import { FormErrors } from "@/model/FormErrors";

interface FormFields {
    file?: File;
    delimiter?: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (file: File, delimiter: string) => void;
}

export const FileInputForm: React.FC<Props> = ({ formRef, onSubmit }) => {
    const [file, setFile] = useState<File>();
    const [delimiter, setDelimiter] = useState<string>('-');
    const [errors, setErrors] = useState<FormErrors<FormFields>>({});

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newErrors: FormErrors<FormFields> = {};

        if(!file) newErrors.file = 'File is required';
        if(!delimiter) newErrors.delimiter = 'Delimiter is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(file!, delimiter);
        setFile(undefined);
        setDelimiter('-');
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
                <FileInput onChange={(currentFile) => setFile(currentFile)}/>
                <FormErrorMessage>{errors.file}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.delimiter}> 
                <FormLabel>Delimiter</FormLabel>
                <Input value={delimiter ?? ''} maxLength={1} onChange={(event) => setDelimiter(event.currentTarget.value)}/>
                <FormErrorMessage>{errors.delimiter}</FormErrorMessage>
            </FormControl>
        </Flex>
    </form>);
}