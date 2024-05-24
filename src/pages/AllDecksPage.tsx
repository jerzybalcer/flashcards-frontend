import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { PageHeading } from "../components/PageHeading";
import { getDecks } from "../services/DeckService";
import { Loading } from "../components/Loading";
import { Deck } from "../model/Deck";
import { ListNavigation } from "../components/ListNavigation/ListNavigation";
import { DeckList } from "../components/DeckList";
import { Scrollable } from "../components/Scrollable";
import { AddDeckModal } from "../components/modals/AddDeckModal";


export const AllDecksPage = () => {
    const { isLoading: decksLoading, data: decks } = useQuery('decks', getDecks);

    const [displayedDecks, setDisplayedDecks] = useState<Deck[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

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

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="Decks"/>

            {decksLoading && <Loading />}

            {!decksLoading && decks && (
            <Flex direction='column' h='100%' px={2} gap={8}>
                <ListNavigation onSearch={(phrase) => setDisplayedDecks(decksAfterSearch(phrase))} onAddClick={() => setIsAddModalOpen(true)}/>
                <Scrollable>
                    <DeckList decks={displayedDecks}/>
                </Scrollable>
            </Flex>
            )}

            <AddDeckModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </Flex>
    );
}