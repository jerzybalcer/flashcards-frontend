import { useEffect, useState } from "react"
import { Box, Button, Flex, Heading, Tag, Text } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { AddCardModal } from "../components/modals/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { useNavigate, useParams } from "react-router-dom"
import { ListNavigation } from "../components/ListNavigation/ListNavigation"
import { IconCheckbox, IconSchool } from "@tabler/icons-react"
import { DeckSettingsModal } from "../components/modals/DeckSettingsModal"
import { Loading } from "../components/Loading"
import { useDeck } from "../hooks/queries/useDeck"
import { useCards } from "../hooks/queries/useCards"

export const DeckPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();
    const [displayedCards, setDisplayedCards] = useState<FlashCard[]>([]);

    const { deckId } = useParams();
    const navigate = useNavigate();

    const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));
    const { isFetching: cardsLoading, data: cards } = useCards(Number(deckId), !deckLoading);

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
            <PageHeading title="Deck" urlToGoBack='/decks' />

            {deckLoading && <Loading />}
            {!deckLoading && deck &&
            (<Flex direction='column' px={4} gap={4} h='90%' overflowY='auto'>
                <Flex direction='column' gap={2}>
                    <Box>
                        <Tag size='md' colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                    </Box>
                    <Flex justify='space-between' align='center'>
                        <Heading size='lg'>{deck.name}</Heading>
                        <DeckSettingsModal deck={deck} />
                    </Flex>
                </Flex>

                <Flex gap={2} mb={6}>
                    <Button flexGrow={1} py={12} onClick={() => navigate(`/decks/${deck.id}/learn`)}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconSchool size={32}/>
                            <Text>Learn</Text>
                        </Flex>
                    </Button>
   
                    <Button flexGrow={1} py={12} onClick={() => navigate(`/decks/${deck.id}/quiz`)}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconCheckbox size={32}/>
                            <Text>Quiz</Text>
                        </Flex>
                    </Button>
                </Flex>

                <Heading size='md'>Flashcards</Heading>
                <ListNavigation onAddClick={() => onAddCardModalOpen()} onSearch={(phrase) => setCardsSearchPhrase(phrase)}/>
                <FlashCardList cards={displayedCards} cardsLoading={cardsLoading} onAddCardModalOpen={(flashCard?: FlashCard) => onAddCardModalOpen(flashCard) }/>
            </Flex>)}
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} flashCard={flashCardInEdit} deckId={Number(deckId)}/>
        </Flex>
    )
}