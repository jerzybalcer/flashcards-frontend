import { Flex, Card, CardBody, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { Deck } from "../model/Deck"
import { groupBy } from "../utils/arrays";

interface DeckListProps {
    decks: Deck[]
}

export const DeckList: React.FC<DeckListProps> = ({ decks }) => {
    const decksGroupedByLanguage = groupBy(decks, 'languageId');

    const navigate = useNavigate();

    const handleDeckClick = (deck: Deck) => {
        navigate(`/decks/${deck.id}`, { state: deck });
    }

    return (
    <Flex direction='column' gap={6}>
        {Object.keys(decksGroupedByLanguage).map(language => 
            <Flex direction='column' key={language}>
                <Text mb={2}>{decksGroupedByLanguage[language][0].languageName}</Text>
                <Flex direction='column' px={2} gap={4}>
                    {decksGroupedByLanguage[language].map(deck => 
                    <Card key={deck.id} onClick={() => handleDeckClick(deck)}>
                        <CardBody gap={2} display='flex' flexDirection='column'>
                            <Text>{deck.name}</Text>
                            <Text opacity={0.8}>{deck.cardsCount} cards</Text>
                        </CardBody>
                    </Card>)}
                </Flex>
            </Flex>)}
    </Flex>);
}