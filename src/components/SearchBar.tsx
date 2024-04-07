import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { IconSearch } from "@tabler/icons-react"

interface SearchBarProps {
    onSearch: (phrase: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
    <InputGroup margin='auto'>
        <InputLeftElement pointerEvents='none'>
            <IconSearch color='gray' />
        </InputLeftElement>
        <Input placeholder='Search for a word' 
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onSearch(ev.currentTarget.value)} 
        />
    </InputGroup>
    )
}