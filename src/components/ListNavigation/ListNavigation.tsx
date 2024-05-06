import { Box, Flex } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import { AddButton } from "./AddButton";

interface ListNavigationProps {
    onSearch: (phrase: string) => void;
    onAddClick: () => void;
}

export const ListNavigation: React.FC<ListNavigationProps> = ({ onSearch, onAddClick }) => {
    return (
        <Flex gap={2}>
            <Box flexGrow={1}>
                <SearchBar onSearch={onSearch}/>
            </Box>
            <SortButton />
            <AddButton onClick={onAddClick}/>
        </Flex>
    );
}