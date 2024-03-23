import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { FlashCardListElement } from "./FlashCardListElement";

interface FlashCardListProps {
    cards: FlashCard[] | undefined;
    cardsLoading: boolean;
    searchPhrase: string;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ cards, cardsLoading, searchPhrase }) => {

    const search = (cards: FlashCard[]) => {
        return cards.filter(c => 
            c.foreignWord.toLowerCase().includes(searchPhrase.toLowerCase())
            || 
            c.translatedWord.toLowerCase().includes(searchPhrase.toLowerCase())
        )
    }

    return (
        <Flex direction='column' h='100%' px={4}>
            {cardsLoading && <Flex
                height="100vh"
                justify='center'
                alignItems='center'
            >
                <Spinner size='xl' />
            </Flex>}
            <Heading size='md' opacity={0.8} my={2}>{cards?.length ?? 0} items total</Heading>
            <Flex overflowY='auto' direction='column' h='100%'>
            {!cardsLoading 
            && search(cards!).map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} />)}
            </Flex>
        </Flex>
    )
}