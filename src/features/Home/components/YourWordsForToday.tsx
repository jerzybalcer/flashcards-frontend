import { Box, Card, CardBody, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { useDailyCards } from "../hooks/queries/useDailyCards";
import { Loading } from "@/shared/components/Loading";

interface Props {
    onInfoClick?: () => void;   
}

export const YourWordsForToday: React.FC<Props> = ({ onInfoClick }) => {
    const { isFetching: cardsLoading, data: cards } = useDailyCards();
    const alreadyStudied: boolean = true; // TODO: replace with actual logic

    return (
        <Flex direction="column" gap={5}>
            <Flex justify='space-between'>
                <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Your words for today</Heading>
                {cards && cards.length > 0 && (
                    <IconArrowRight size='36px' color="var(--chakra-colors-blue-200)" onClick={onInfoClick}/>
                )}
            </Flex>
            {cardsLoading && (<Loading />)}

            {!cardsLoading && (!cards || cards.length === 0) && (
                <Center h='100%' opacity={0.8}>Add some flashcards to unlock this.</Center>
            )}

            {alreadyStudied && (
                <Flex gap={2}>
                    <Text fontSize='20px' fontWeight={700} color='blue.200'>Already studied today</Text>
                    <Box bg='blue.200' borderRadius='50%' p='2px' w='28px' h='28px'>
                        <IconCheck color='black' size='24px'/>
                    </Box>
                </Flex>
            )}

            {!cardsLoading && cards && cards.length !== 0 && (
            <Card onClick={() => {}}>
                <CardBody gap={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Text fontSize='32px' fontWeight={700} userSelect='text' color='blue.200'>{cards[0].foreignWord}</Text>
                    <Text fontSize='20px' fontWeight={700} userSelect='text'>{cards[0].translatedWord}</Text>
                </CardBody>
            </Card>
            )}
        </Flex>
    );
}