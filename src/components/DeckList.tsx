import { Card, CardBody, Text, Tag, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, HStack } from "@chakra-ui/react"
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

    const getExpandedLanguages = () => Object.keys(decksGroupedByLanguage).map((_, index) => index);
    console.log(decks, getExpandedLanguages());

    return (
    <Accordion display='flex' flexDirection='column' gap={6} allowToggle allowMultiple border='transparent'>
        {Object.keys(decksGroupedByLanguage).map(language => 
            <AccordionItem display='flex' flexDirection='column' key={language}>
                <AccordionButton display='flex' justifyContent='space-between' alignItems='center' mb={2} gap={1} p={0} w='100%'>
                    <HStack>
                        <Text>{decksGroupedByLanguage[language][0].languageName}</Text>
                        <Tag colorScheme="blue" variant='subtle'>{language.toUpperCase()}</Tag>
                    </HStack>
                    <AccordionIcon alignSelf='end'/>
                </AccordionButton>
                <AccordionPanel display='flex' flexDirection='column' gap={4} p={2}>
                    {decksGroupedByLanguage[language].map(deck => 
                    <Card key={deck.id} onClick={() => handleDeckClick(deck)}>
                        <CardBody gap={2} display='flex' flexDirection='column'>
                            <Text>{deck.name}</Text>
                            <Text opacity={0.8}>{deck.cardsCount} cards</Text>
                        </CardBody>
                    </Card>)}
                </AccordionPanel>
            </AccordionItem>)}
    </Accordion>);
}