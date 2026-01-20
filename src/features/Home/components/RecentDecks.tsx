import { Deck } from "@/model/Deck";
import { SortDecksBy } from "@/model/SortDecksBy";
import { Loading } from "@/shared/components/Loading";
import { useAllDecks } from "@/shared/hooks/queries/useAllDecks";
import { Card, CardBody, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const RecentDecks = () => {
    // TODO: use actual recent decks instead of fetching all decks
    const { isFetching: decksLoading, data: decks } = useAllDecks(null, SortDecksBy.NumberOfCards, 'descending');

    const navigate = useNavigate();

    const handleDeckClick = (deck: Deck) => {
        navigate(`/decks/${deck.id}`, { state: deck });
    }

    return (
        <Flex direction="column" gap={5}>
            <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Recent Decks</Heading>
            {decksLoading && <Loading />}
            {!decksLoading && !decks && <Text opacity={0.8}>No decks to show.</Text>}
            {decks && !decksLoading && decks.slice(0, 2).map(deck => (
                <Card key={deck.id} onClick={() => handleDeckClick(deck)}>
                    <CardBody display='flex' gap={2} justifyContent='space-between'>
                        <Flex gap={2} flexDirection='column'>
                            <Text fontSize='24px' fontWeight={700}>{deck.name}</Text>
                            <Flex gap={2} align='center'>
                                <Tag colorScheme="blue" variant='subtle'>{deck.languageId.toUpperCase()}</Tag>
                                <Text fontSize='20px' fontWeight={700} color='blue.200'>{deck.cardsCount} flashcards</Text>
                            </Flex>
                        </Flex>
                        <Flex direction='column' align='center' gap={1}>
                            <Text fontSize='20px' fontWeight={700}>Go to</Text>
                            <IconArrowRight size='36px' color="var(--chakra-colors-blue-200)" />
                        </Flex>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    );
}