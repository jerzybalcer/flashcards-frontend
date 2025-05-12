import { Box, Flex } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import { AddButton } from "./AddButton";

interface ListNavigationProps {
    onSearch: (phrase: string) => void;
    onAddClick: () => void;
    onSortClick: () => void;
}

export const ListNavigation: React.FC<ListNavigationProps> = ({ onSearch, onAddClick, onSortClick }) => {
    return (
        <Flex gap={2}>
            <Box flexGrow={1} h='100%'>
                <SearchBar onSearch={onSearch}/>
            </Box>
            <SortButton onClick={onSortClick}/>
            <AddButton onClick={onAddClick}/>
        </Flex>
    );
}