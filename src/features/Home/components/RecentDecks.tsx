import { Deck } from "@/model/Deck";
import { Loading } from "@/shared/components/Loading";
import { Card, CardBody, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useRecentDecks } from "../hooks/queries/useRecentDecks";

export const RecentDecks = () => {
    const { isFetching: decksLoading, data: decks } = useRecentDecks();

    const navigate = useNavigate();

    const handleDeckClick = (deck: Deck) => {
        navigate(`/decks/${deck.id}`, { state: deck });
    }

    return (
        <Flex direction="column" gap={5}>
            <Heading as='h2' fontSize='h2' fontFamily='Playwrite US Modern' fontWeight={400}>Recent Decks</Heading>
            {decksLoading && <Loading />}
            {!decksLoading && !decks && <Text opacity={0.8}>No decks to show.</Text>}
            {decks && !decksLoading && decks.slice(0, 2).map(deck => (
                <Card key={deck.id} onClick={() => handleDeckClick(deck)} borderRadius='xl'>
                    <CardBody display='flex' gap={4} justifyContent='space-between'>
                        <Flex gap={2} flexDirection='column' minW={0}>
                            <Text fontSize='t1' fontWeight={600} maxW='100%' noOfLines={1} wordBreak='break-all'>{deck.name}</Text>
                            <Flex gap={2} align='center'>
                                <Tag colorScheme="blue" variant='subtle'>{deck.languageId.toUpperCase()}</Tag>
                                <Text fontSize='bd' fontWeight='normal' color='white'>{deck.cardsCount} flashcards</Text>
                            </Flex>
                        </Flex>
                        <Flex direction='column' justify='center' align='center' gap={1} flexShrink={0}>
                            <IconArrowRight size='32px' color="var(--chakra-colors-blue-200)" />
                        </Flex>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    );
}