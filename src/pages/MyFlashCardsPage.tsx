import { Flex } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { useState } from "react"
import { AddCardModal } from "../components/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { useQuery } from "react-query"
import { getCards } from "../services/CardService"

export const MyFlashCardsPage = () => {
    // @ts-ignore
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();

    const onAddCardModalOpen = (flashCard?: FlashCard) => {
        setFlashCardInEdit(flashCard);
        setAddCardModalOpen(true);
    }

    const { isLoading: cardsLoading, data: cards, refetch: refreshCards } = useQuery('cards', getCards);

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="My Flashcards" />
            <FlashCardList cards={cards} cardsLoading={cardsLoading} searchPhrase={cardsSearchPhrase} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit} refreshCardList={refreshCards}/>
        </Flex>
    )
}