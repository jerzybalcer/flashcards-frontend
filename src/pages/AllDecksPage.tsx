import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useLocalStorage } from "usehooks-ts";
import { PageHeading } from "@/shared/components/PageHeading";
import { ListNavigation } from "../shared/components/ListNavigation/ListNavigation";
import { DeckList } from "@/features/AllDecks/components/DeckList";
import { AddDeckDialog } from "@/features/AllDecks/components/AddDeckDialog";
import { SortDecksSettings } from "../model/SortDecksSettings";
import { SortDecksBy } from "../model/SortDecksBy";
import { SortDecksBottomSheet } from "@/features/AllDecks/components/SortDecksBottomSheet";
import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { AddDeckBottomSheet } from "@/features/AllDecks/components/AddDeckBottomSheet";
import { useDebounce } from "@/shared/hooks/general/useDebounce";


export const AllDecksPage = () => {
    const [isAddDeckOpen, setAddDeckOpen] = useState<boolean>(false);
    const [isSortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [sortSettings] = useLocalStorage<SortDecksSettings>('sortDecksSettings', { sortBy: SortDecksBy.Name, direction: 'ascending'});
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const debouncedSearchPhrase = useDebounce<string>(searchPhrase, 250);
    
    const isMobile = useIsMobile();

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Decks"/>
            <Flex direction='column' h='100%' px={2} gap={8}>
                <ListNavigation onSearch={(phrase) => setSearchPhrase(phrase)} onAddClick={() => setAddDeckOpen(true)} onSortClick={() => setSortMenuOpen(true)}/>
                <DeckList searchPhrase={debouncedSearchPhrase} sortSettings={sortSettings}/>
            </Flex>

            {isMobile ? 
            <AddDeckBottomSheet isOpen={isAddDeckOpen} onClose={() => setAddDeckOpen(false)} />
            :
            <AddDeckDialog isOpen={isAddDeckOpen} onClose={() => setAddDeckOpen(false)} />
            }
            
            <SortDecksBottomSheet isOpen={isSortMenuOpen} onClose={() => setSortMenuOpen(false)} />
        </Flex>
    );
}