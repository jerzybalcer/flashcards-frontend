import { BottomSheet } from "./BottomSheet";
import { Box, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { RadioCardGroup } from "./RadioCardGroup";
import { SortCardsBy, SortCardsByOptions } from "../model/SortCardsBy";
import { SortDirection } from "../model/SortDirection";
import { useLocalStorage } from "usehooks-ts";
import { SortCardsSettings } from "../model/SortCardsSettings";

interface Props {
    isOpen: boolean;
    onSort: (sortBy: SortCardsBy, direction: SortDirection) => void;
    onClose: () => void;
}

export const SortCardsBottomSheet: React.FC<Props> = ({ isOpen, onSort, onClose }) => {
    const [settings, setSettings] = useLocalStorage<SortCardsSettings>('sortCardsSettings', { sortBy: SortCardsBy.DateAdded, direction: 'descending' });

    function handleSortByChange(value: string){
        const newSortBy = Object.entries(SortCardsByOptions).find(x => x[1] === value)?.[0] as SortCardsBy;
        setSettings({...settings, sortBy: newSortBy});
    }

    function handleDirectionChange(direction: SortDirection) {
        setSettings({...settings, direction: direction});
    }

    function handleSort() {
        onSort(settings.sortBy, settings.direction);
        onClose();
    }

    function getBody() {
        return (
            <FormControl display='flex' justifyContent='center' flexDir='column' gap={8} px={4}>
                <Box>
                    <FormLabel>By</FormLabel>
                    <RadioCardGroup options={Object.values(SortCardsByOptions)} onChange={(value) => handleSortByChange(value)} defaultValue={SortCardsByOptions[settings.sortBy]} />
                </Box>
                <Box>
                    <FormLabel>Direction</FormLabel>
                    <RadioCardGroup options={['ascending', 'descending'] as SortDirection[]} onChange={(direction) => handleDirectionChange(direction as SortDirection)} defaultValue={settings.direction}/>
                </Box>
            </FormControl>
        )
    }

    return (
        <BottomSheet isOpen={isOpen}
            header={[<Text fontWeight='bold'>Sort flashcards</Text>]}
            body={[getBody()]}
            confirmText="Apply"
            onConfirm={() => handleSort()}
            onClose={onClose}
        />
    );
}