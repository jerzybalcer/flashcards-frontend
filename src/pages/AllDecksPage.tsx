import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { PageHeading } from "../components/PageHeading";
import { Loading } from "../components/Loading";
import { Deck } from "../model/Deck";
import { ListNavigation } from "../components/ListNavigation/ListNavigation";
import { DeckList } from "../components/DeckList";
import { Scrollable } from "../components/Scrollable";
import { AddDeckModal } from "../components/modals/AddDeckModal";
import { useAllDecks } from "../hooks/queries/useAllDecks";
import { SortDecksBottomSheet } from "../components/SortDecksBottomSheet";
import { SortDecksSettings } from "../model/SortDecksSettings";
import { SortDecksBy } from "../model/SortDecksBy";
import { SortDirection } from "../model/SortDirection";


export const AllDecksPage = () => {
    const [displayedDecks, setDisplayedDecks] = useState<Deck[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isSortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [sortSettings, setSortSettings] = useState<SortDecksSettings>({ sortBy: SortDecksBy.Name, direction: 'descending' });

    const { isFetching: decksLoading, data: decks } = useAllDecks(sortSettings.sortBy, sortSettings.direction);
    
    const decksAfterSearch = (searchPhrase: string) => {
        if(!decks) return [];

        if(!searchPhrase) return decks;

        return decks.filter(deck => 
            deck.name.toLowerCase().includes(searchPhrase.toLowerCase())
            ||
            deck.languageName.toLowerCase().includes(searchPhrase.toLowerCase())
        );
    }

    useEffect(() => setDisplayedDecks(decks ?? []), [decks]);

    const handleSort = (sortBy: SortDecksBy, direction: SortDirection) => {
        setSortSettings({ sortBy: sortBy, direction: direction });
    }

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Decks"/>

            {decksLoading && <Loading />}

            {!decksLoading && decks && (
            <Flex direction='column' h='100%' px={2} gap={8}>
                <ListNavigation onSearch={(phrase) => setDisplayedDecks(decksAfterSearch(phrase))} onAddClick={() => setIsAddModalOpen(true)} onSortClick={() => setSortMenuOpen(true)}/>
                <Scrollable>
                    <DeckList decks={displayedDecks}/>
                </Scrollable>
            </Flex>
            )}

            <AddDeckModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <SortDecksBottomSheet isOpen={isSortMenuOpen} onSort={handleSort} onClose={() => setSortMenuOpen(false)} />
        </Flex>
    );
}