import { Card, CardBody, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";
import { useDailyCards } from "../hooks/queries/useDailyCards";
import { Loading } from "@/shared/components/Loading";

interface Props {
    onInfoClick?: () => void;   
}

export const YourWordsForToday: React.FC<Props> = ({ onInfoClick }) => {
    const { isFetching: cardsLoading, data: cards } = useDailyCards();

    return (
        <Flex direction="column" gap={5}>
            <Flex justify='space-between' align='center'>
                <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Your words for today</Heading>
                <IconInfoCircle size='32px' strokeWidth={1.5} color="var(--chakra-colors-blue-200)" onClick={onInfoClick}/>
            </Flex>
            {cardsLoading && (<Loading />)}

            {!cardsLoading && (!cards || cards.length === 0) && (
                <Center h='100%' opacity={0.8}>Add some flashcards to unlock this.</Center>
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