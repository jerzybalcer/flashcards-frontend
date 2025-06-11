import { Flex, useDisclosure } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { PageHeading } from "@/shared/components/PageHeading"
import { Loading } from "@/shared/components/Loading"
import { useDeck } from "@/shared/hooks/queries/useDeck"
import { DeckDetailsBottomSheet } from "@/features/Deck/components/bottomSheets/DeckDetailsBottomSheet"
import { DeleteDeckConfirmationDialog } from "@/features/Deck/components/dialogs/DeleteDeckConfirmationDialog"
import { TooFewCardsBottomSheet } from "@/features/Deck/components/bottomSheets/TooFewCardsBottomSheet"
import { DeckActions } from "@/features/Deck/components/DeckActions"
import { DeckHeader } from "@/features/Deck/components/DeckHeader"
import { DeckFlashCards } from "@/features/Deck/components/DeckFlashCards"

export const DeckPage = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();

    const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));

    const deckDetailsModal = useDisclosure();
    const tooFewCardsModal = useDisclosure();
    const deleteDeckConfirmationModal = useDisclosure();
    function handleLearnClick() {
        if(deck && deck.cardsCount > 0){
            navigate(`/decks/${deck.id}/learn`);
        }else{
            tooFewCardsModal.onToggle();
        }
    }
    function handleQuizClick() {
        if(deck && deck.cardsCount >= 10) {
            navigate(`/decks/${deck.id}/quiz`);
        }else{
            tooFewCardsModal.onToggle();
        }
    }

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Deck" urlToGoBack='/decks' />
            {deckLoading && <Loading />}

            {!deckLoading && deck &&
            (<>
                <Flex direction='column' px={4} gap={4} h='90%' overflowY='auto'>
                    <DeckHeader deck={deck} onDeckDetailsOpen={deckDetailsModal.onToggle} />
                    <DeckActions onLearnClick={handleLearnClick} onQuizClick={handleQuizClick} />
                    <DeckFlashCards deck={deck} />
                </Flex>

                <TooFewCardsBottomSheet isOpen={tooFewCardsModal.isOpen} onClose={tooFewCardsModal.onClose} />
                <DeckDetailsBottomSheet isOpen={deckDetailsModal.isOpen} onClose={deckDetailsModal.onClose} deck={deck} onDelete={deleteDeckConfirmationModal.onToggle} />
                <DeleteDeckConfirmationDialog isOpen={deleteDeckConfirmationModal.isOpen} onClose={deleteDeckConfirmationModal.onClose} deck={deck}/>
            </>)}
        </Flex>
    )
}