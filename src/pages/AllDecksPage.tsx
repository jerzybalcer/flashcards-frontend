import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { PageHeading } from "../components/PageHeading";
import { Loading } from "../components/Loading";
import { ListNavigation } from "../components/ListNavigation/ListNavigation";
import { DeckList } from "../components/DeckList";
import { Scrollable } from "../components/Scrollable";
import { AddDeckModal } from "../components/modals/AddDeckModal";
import { useAllDecks } from "../hooks/queries/useAllDecks";
import { SortDecksSettings } from "../model/SortDecksSettings";
import { SortDecksBy } from "../model/SortDecksBy";
import { SortDecksBottomSheet } from "../components/bottomSheets/SortDecksBottomSheet";
import { useIsMobile } from "../hooks/general/useIsMobile";
import { AddDeckBottomSheet } from "../components/bottomSheets/AddDeckBottomSheet";
import { useLocalStorage } from "usehooks-ts";
import { useDebounce } from "../hooks/general/useDebounce";


export const AllDecksPage = () => {
    const [isAddDeckOpen, setAddDeckOpen] = useState<boolean>(false);
    const [isSortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [sortSettings] = useLocalStorage<SortDecksSettings>('sortDecksSettings', { sortBy: SortDecksBy.Name, direction: 'ascending'});
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const debouncedSearchPhrase = useDebounce<string>(searchPhrase, 250);
    
    const { isFetching: decksLoading, data: decks } = useAllDecks(debouncedSearchPhrase, sortSettings.sortBy, sortSettings.direction);

    const isMobile = useIsMobile();

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Decks"/>

            {decksLoading && <Loading />}

            <Flex direction='column' h='100%' px={2} gap={8}>
                <ListNavigation onSearch={(phrase) => setSearchPhrase(phrase)} onAddClick={() => setAddDeckOpen(true)} onSortClick={() => setSortMenuOpen(true)}/>
                {!decksLoading && decks && (
                <Scrollable>
                    <DeckList decks={decks}/>
                </Scrollable>
                )}
            </Flex>

            {isMobile ? 
            <AddDeckBottomSheet isOpen={isAddDeckOpen} onClose={() => setAddDeckOpen(false)} />
            :
            <AddDeckModal isOpen={isAddDeckOpen} onClose={() => setAddDeckOpen(false)} />
            }
            
            <SortDecksBottomSheet isOpen={isSortMenuOpen} onClose={() => setSortMenuOpen(false)} />
        </Flex>
    );
}