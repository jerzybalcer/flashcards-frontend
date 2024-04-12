import { useEffect, useState } from "react"
import { Button, Flex, Heading } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { AddCardModal } from "../components/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { getCards } from "../services/CardService"
import { SearchBar } from "../components/SearchBar"

export const MyFlashCardsPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();
    const [displayedCards, setDisplayedCards] = useState<FlashCard[]>([]);

    const { isLoading: cardsLoading, data: cards } = useQuery('cards', getCards);

    const onAddCardModalOpen = (flashCard?: FlashCard) => {
        setFlashCardInEdit(flashCard);
        setAddCardModalOpen(true);
    }

    const searchForCards = (): FlashCard[] => cards?.filter(c => 
        c.foreignWord.toLowerCase().includes(cardsSearchPhrase.toLowerCase())
        || 
        c.translatedWord.toLowerCase().includes(cardsSearchPhrase.toLowerCase())
    ) ?? [];
    
    useEffect(() => {
        setDisplayedCards(searchForCards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards, cardsSearchPhrase]);

    return (
        <Flex direction='column' h='100%' pb={4}>
            <PageHeading title="My Flashcards" />
            <Flex direction='column' px={4} gap={2} h='90%'>
                <Flex justifyContent='space-between' alignItems='center' mb={4}>
                    <Heading size='md' opacity={0.8}>{displayedCards?.length ?? 0} flashcards</Heading>
                    <Button colorScheme="teal" onClick={() => onAddCardModalOpen()}>Add</Button>
                </Flex>
                <SearchBar onSearch={(phrase) => setCardsSearchPhrase(phrase)} />
                <FlashCardList cards={displayedCards} cardsLoading={cardsLoading} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            </Flex>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit}/>
        </Flex>
    )
}