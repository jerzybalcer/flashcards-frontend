import { Alert, AlertIcon, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FileInput } from "./FileInput";

interface FileInputFormProps {
    onFileChange: (file: File) => void;
    onDelimiterChange: (delimiter: string) => void;
}

export const FileInputForm: React.FC<FileInputFormProps> = ({ onFileChange, onDelimiterChange }) => {
    return (
    <Flex direction='column' gap={6}>
        <Alert status='info'>
            <AlertIcon />
            Put each word pair in a new line. Separate the pair by a delimiter set below.
        </Alert>

        <FormControl isRequired>
            <FormLabel>File</FormLabel>
            <FileInput onChange={(currentFile) => onFileChange(currentFile)}/>
        </FormControl>

        <FormControl isRequired> 
            <FormLabel>Delimiter</FormLabel>
            <Input defaultValue='-' maxLength={1} onChange={(event) => onDelimiterChange(event.currentTarget.value)}/>
        </FormControl>
    </Flex>);
}