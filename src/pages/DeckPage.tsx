import { useEffect, useState } from "react"
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { AddCardModal } from "../components/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { getCards } from "../services/DeckService"
import { useLocation, useNavigate } from "react-router-dom"
import { ListNavigation } from "../components/ListNavigation/ListNavigation"
import { IconCheckbox, IconSchool } from "@tabler/icons-react"

export const DeckPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();
    const [displayedCards, setDisplayedCards] = useState<FlashCard[]>([]);

    const { state: deck } = useLocation();
    const navigate = useNavigate();

    const { isLoading: cardsLoading, data: cards } = useQuery(`deck-${deck.id}-cards`, () => getCards(deck.id));

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
        <Flex direction='column' h='100%'>
            <PageHeading canGoBack />
            <Flex direction='column' px={4} gap={4} h='90%' overflowY='auto'>
                <Flex align='center' gap={2}>
                    <Image w={8} h={8} src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/IT.svg" />
                    <Heading>{deck.name}</Heading>
                </Flex>

                <Flex gap={2} mb={4}>
                    <Button variant='outline' flexGrow={1} py={12} onClick={() => navigate('/learn', { state: { deck: deck, cards: cards }})}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconSchool size={32}/>
                            <Text>Learn</Text>
                        </Flex>
                    </Button>
   
                    <Button variant='outline' flexGrow={1} py={12} onClick={() => navigate('/quiz')}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconCheckbox size={32}/>
                            <Text>Quiz</Text>
                        </Flex>
                    </Button>
                </Flex>

                <Heading size='lg'>Flashcards</Heading>
                <ListNavigation onAddClick={() => onAddCardModalOpen()} onSearch={(phrase) => setCardsSearchPhrase(phrase)}/>
                <FlashCardList cards={displayedCards} cardsLoading={cardsLoading} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            </Flex>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit}/>
        </Flex>
    )
}