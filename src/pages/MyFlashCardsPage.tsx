import { Flex } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { useState } from "react"
import { AddCardModal } from "../components/AddCardModal"
import { FlashCard } from "../model/FlashCard"

export const MyFlashCardsPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();

    const onAddCardModalOpen = (flashCard?: FlashCard) => {
        setFlashCardInEdit(flashCard);
        setAddCardModalOpen(true);
    }

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="My Flashcards" />
            <FlashCardList searchPhrase={cardsSearchPhrase} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit}/>
        </Flex>
    )
}