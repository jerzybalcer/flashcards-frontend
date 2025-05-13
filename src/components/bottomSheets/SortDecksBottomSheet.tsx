import { BottomSheet } from "./BottomSheet";
import { Box, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useLocalStorage } from "usehooks-ts";
import { SortDecksBy, SortDecksByOptions } from "../../model/SortDecksBy";
import { SortDecksSettings } from "../../model/SortDecksSettings";
import { SortDirection } from "../../model/SortDirection";
import { RadioCardGroup } from "../RadioCardGroup";


interface Props {
    isOpen: boolean;
    onSort: (sortBy: SortDecksBy, direction: SortDirection) => void;
    onClose: () => void;
}

export const SortDecksBottomSheet: React.FC<Props> = ({ isOpen, onSort, onClose }) => {
    const [settings, setSettings] = useLocalStorage<SortDecksSettings>('sortDecksSettings', { sortBy: SortDecksBy.Name, direction: 'descending' });

    function handleSortByChange(value: string){
        const newSortBy = Object.entries(SortDecksByOptions).find(x => x[1] === value)?.[0] as SortDecksBy;
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
                    <RadioCardGroup options={Object.values(SortDecksByOptions)} onChange={(value) => handleSortByChange(value)} defaultValue={SortDecksByOptions[settings.sortBy]} />
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
            header={[<Text fontWeight='bold'>Sort decks</Text>]}
            body={[getBody()]}
            confirmText="Apply"
            onConfirm={() => handleSort()}
            onClose={onClose}
        />
    );
}