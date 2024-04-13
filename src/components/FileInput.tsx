import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { IconFile, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

interface FileInputProps {
    onChange: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
    const [file, setFile] = useState<File>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newFile = event.target.files![0] as File;

        onChange(newFile);
        setFile(newFile);
    }

    return (
        <Button
            w='100%'
            h='100%'
            p={4}
            border='2px'
            borderStyle='dashed'
            variant = 'ghost'>
            <Input type='file' w ='100%' h='100%' opacity='0' 
                position='absolute' onChange={handleChange}></Input>
            <Flex direction='column' justifyContent='center' alignItems = 'center' gap={2}>
                {!file && 
                (<>
                    <IconUpload></IconUpload>
                    <Text>Choose file to upload</Text>
                    <Text color='gray' fontSize='sm'>Supported formats: CSV</Text>
                </>)}
                {file && (
                    <>
                    <IconFile />
                    <Text>Uploaded file: {file.name}</Text>
                    </>
                )}
            </Flex>
        </Button>
    );
};
