import { Flex, useDisclosure } from "@chakra-ui/react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import { PageHeading } from "@/shared/components/PageHeading";
import { ListNavigation } from "../shared/components/ListNavigation/ListNavigation";
import { DeckList } from "@/features/AllDecks/components/DeckList";
import { SortDecksSettings } from "../model/SortDecksSettings";
import { SortDecksBy } from "../model/SortDecksBy";
import { SortDecksBottomSheet } from "@/features/AllDecks/components/SortDecksBottomSheet";
import { AddDeckModal } from "@/features/AllDecks/components/AddDeckModal";


export const AllDecksPage = () => {
    const addDeckModal = useDisclosure();
    const sortMenuModal = useDisclosure();
    const [sortSettings] = useLocalStorage<SortDecksSettings>('sortDecksSettings', { sortBy: SortDecksBy.Name, direction: 'ascending'});
    const [searchText, setSearchText] = useDebounceValue<string>('', 250);

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Decks"/>
            <Flex direction='column' h='100%' px={2} gap={8}>
                <ListNavigation onSearch={(phrase) => setSearchText(phrase)} onAddClick={addDeckModal.onToggle} onSortClick={sortMenuModal.onToggle}/>
                <DeckList searchPhrase={searchText} sortSettings={sortSettings}/>
            </Flex>

            <AddDeckModal isOpen={addDeckModal.isOpen} onClose={addDeckModal.onClose} />
            <SortDecksBottomSheet isOpen={sortMenuModal.isOpen} onClose={sortMenuModal.onClose} />
        </Flex>
    );
}