import React, { useState } from "react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { ListNavigation } from "@/shared/components/ListNavigation/ListNavigation";
import { FlashCardList } from "./FlashCardList";
import { SortCardsSettings } from "@/model/SortCardsSettings";
import { SortCardsBy } from "@/model/SortCardsBy";
import { SortCardsModal } from "./modals/SortCardsModal";
import { AddCardModal } from "./modals/AddCardModal";
import { EditCardModal } from "./modals/EditCardModal";
import { FlashCard } from "@/model/FlashCard";
import { Deck } from "@/model/Deck";

interface Props {
    deck: Deck;
}

export const DeckFlashCards: React.FC<Props> = ({ deck }) => {
    const [searchText, setSearchText] = useDebounceValue<string>('', 250);

    const [sortSettings] = useLocalStorage<SortCardsSettings>('sortCardsSettings', { sortBy: SortCardsBy.DateAdded, direction: 'descending'});

    const [editedFlashCard, setEditedFlashCard] = useState<FlashCard>();

    const addCardModal = useDisclosure();
    const editCardModal = useDisclosure();
    const sortModal = useDisclosure();

    function handleEditCardOpen(flashCard: FlashCard) {
        setEditedFlashCard(flashCard);
        addCardModal.onToggle();
    }

    return <> 
        <Heading size='md'>Flashcards</Heading>
        <ListNavigation onAddClick={addCardModal.onToggle} onSearch={text => setSearchText(text)} onSortClick={sortModal.onToggle} />
        <FlashCardList onEditCardFormOpen={handleEditCardOpen} searchText={searchText} sortSettings={sortSettings} foreignLanguageName={deck.languageName} />

        <AddCardModal deckId={deck.id} isOpen={addCardModal.isOpen} onClose={addCardModal.onClose} />
        <SortCardsModal isOpen={sortModal.isOpen} onClose={sortModal.onClose} />
        {editedFlashCard && 
            <EditCardModal flashCard={editedFlashCard} deckId={deck.id} isOpen={editCardModal.isOpen} onClose={editCardModal.onClose} />
        }
    </>;
}