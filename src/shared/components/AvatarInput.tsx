import { Avatar, Flex, IconButton } from "@chakra-ui/react";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { useState, useRef } from "react";

interface Props {
    onChange: (file: File) => void;
    name?: string;
    defaultImageUrl?: string;
}

export const AvatarInput: React.FC<Props> = ({ onChange, name, defaultImageUrl }) => {

    const [preview, setPreview] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    }

    return (
        <Flex align='center' gap={2}>
            <Avatar src={preview ?? defaultImageUrl} size='lg' name={name} onClick={() => inputRef.current?.click()} cursor='pointer' bg='blue.600' color='white' icon={<IconUser size='32px'/>}/>
            <input type="file" accept="image/*" hidden ref={inputRef} onChange={handleChange} />
            <IconButton variant='ghost' size='md' aria-label="change-picture" icon={<IconEdit />} onClick={() => inputRef.current?.click()} />
        </Flex>
    );
}