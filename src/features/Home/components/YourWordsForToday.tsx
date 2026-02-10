import { Box, Card, CardBody, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { useDailyCards } from "../hooks/queries/useDailyCards";
import { Loading } from "@/shared/components/Loading";
import { Carousel } from "@/shared/components/Carousel";

interface Props {
    onInfoClick?: () => void;   
}

export const YourWordsForToday: React.FC<Props> = ({ onInfoClick }) => {
    const { isFetching: cardsLoading, data: cards } = useDailyCards();
    const alreadyStudied: boolean = true; // TODO: replace with actual logic

    return (
        <Flex direction="column" gap={5}>
            <Flex justify='space-between'>
                <Heading as='h2' fontSize='h2' fontFamily='Playwrite US Modern' fontWeight={400}>Your words for today</Heading>
                {cards && cards.length > 0 && (
                    <IconArrowRight size='36px' color="var(--chakra-colors-blue-200)" onClick={onInfoClick}/>
                )}
            </Flex>

            {alreadyStudied && (
                <Flex gap={2}>
                    <Text fontSize='t2' fontWeight={700} color='blue.200'>Already studied today</Text>
                    <IconCheck color="var(--chakra-colors-blue-200)" size='24px'/>
                </Flex>
            )}

            {cardsLoading && (<Loading />)}

            {!cardsLoading && (!cards || cards.length === 0) && (
                <Center h='100%' opacity={0.8}>Add some flashcards to unlock this.</Center>
            )}

            {!cardsLoading && cards && cards.length !== 0 && (
            <Carousel>
                {cards.map(c => (
                <Card onClick={() => {}} key={c.id} h='100%'>
                    <CardBody gap={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Text fontSize='t1' fontWeight={600} userSelect='text' color='blue.200' textAlign='center'>{c.foreignWord}</Text>
                        <Text fontSize='t1' fontWeight={600} userSelect='text' textAlign='center'>{c.translatedWord}</Text>
                    </CardBody>
                </Card>
                ))}
            </Carousel>
            )}
        </Flex>
    );
}