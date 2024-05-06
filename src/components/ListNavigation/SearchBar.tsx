import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { IconSearch, IconX } from "@tabler/icons-react"
import { useState } from "react";

interface SearchBarProps {
    onSearch: (phrase: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [text, setText] = useState<string>('');

    const handleChange = (newValue: string) => {
        setText(newValue);
        onSearch(newValue);
    };

    return (
    <InputGroup margin='auto'>
        <InputLeftElement pointerEvents='none'>
            <IconSearch color='gray' />
        </InputLeftElement>
        <Input placeholder='Search for a word' value={text}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleChange(ev.currentTarget.value)}
        />
        {text.length > 0 &&         
            <InputRightElement cursor='pointer' onClick={() => handleChange('')}>
                <IconX color='gray'/>
            </InputRightElement>
        }

    </InputGroup>
    )
}