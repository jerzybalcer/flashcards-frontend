import { Card, CardBody, Text, Tag, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, HStack, Center } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { Deck } from "../model/Deck"
import { groupBy } from "../utils/arrays";
import { useAllDecks } from "../hooks/queries/useAllDecks";
import { Scrollable } from "./Scrollable";
import { SortDecksSettings } from "../model/SortDecksSettings";
import { Loading } from "./Loading";

interface DeckListProps {
    searchPhrase: string;
    sortSettings: SortDecksSettings;
}

export const DeckList: React.FC<DeckListProps> = ({ searchPhrase, sortSettings }) => {
    const { isFetching: decksLoading, data: decks } = useAllDecks(searchPhrase, sortSettings.sortBy, sortSettings.direction);

    const decksGroupedByLanguage: Record<string, Deck[]> = decks ? groupBy(decks, 'languageId') : {};

    const navigate = useNavigate();

    const handleDeckClick = (deck: Deck) => {
        navigate(`/decks/${deck.id}`, { state: deck });
    }

    if(decksLoading){
        return <Loading />;
    }

    if(Object.entries(decksGroupedByLanguage).length === 0) {
        return <Center h='100%' opacity={0.8} display='flex' justifyContent='center' flexDirection='column'>No decks to show.</Center>;
    }

    return (
    <Scrollable>
        <Accordion display='flex' flexDirection='column' gap={6} allowMultiple defaultIndex={[0,1,2,3,4,5,6,7,8,9]}>
            {Object.keys(decksGroupedByLanguage).map(language => 
                <AccordionItem display='flex' flexDirection='column' key={language} border='none'>
                    <AccordionButton display='flex' justifyContent='space-between' alignItems='center' gap={1} p={0} py={2} w='100%' position='sticky' top={0} zIndex='docked' bgColor='gray.800' _expanded={{bgColor: 'gray.800'}}>
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
        </Accordion>
    </Scrollable>
    );
}