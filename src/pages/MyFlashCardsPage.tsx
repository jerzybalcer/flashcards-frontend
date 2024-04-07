import { Button, Flex, Heading } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { useState } from "react"
import { AddCardModal } from "../components/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { useQuery } from "react-query"
import { getCards } from "../services/CardService"
import { SearchBar } from "../components/SearchBar"

export const MyFlashCardsPage = () => {
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
            <Flex direction='column' px={4} gap={2} h='90%'>
                <Flex justifyContent='space-between' alignItems='center' mb={2}>
                    <Heading size='md' opacity={0.8}>{cards?.length ?? 0} flashcards</Heading>
                    <Button colorScheme="teal" onClick={() => onAddCardModalOpen()}>Add</Button>
                </Flex>
                <SearchBar onSearch={(phrase) => setCardsSearchPhrase(phrase)} />
                <FlashCardList cards={cards} cardsLoading={cardsLoading} searchPhrase={cardsSearchPhrase} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            </Flex>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit} refreshCardList={() => refreshCards()}/>
        </Flex>
    )
}