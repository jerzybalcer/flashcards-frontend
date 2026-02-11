import { Button, Card, CardBody, Center, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { IconArrowRight, IconCircleCheckFilled, IconInfoCircle } from "@tabler/icons-react";
import { useDailyCards } from "../hooks/queries/useDailyCards";
import { Loading } from "@/shared/components/Loading";
import { Carousel } from "@/shared/components/Carousel";

interface Props {
    onInfoClick?: () => void;   
}

export const YourWordsForToday: React.FC<Props> = ({ onInfoClick }) => {
    const { isFetching: cardsLoading, data: cards } = useDailyCards();
    const alreadyStudied: boolean = Math.random() < 0.5; // TODO: replace with actual logic

    return (
        <Flex direction="column" gap={5}>
            <Flex justify='space-between'>
                <Heading as='h2' fontSize='h2' fontFamily='Playwrite US Modern' fontWeight={400}>Your words for today</Heading>
                {cards && cards.length > 0 && (
                    <IconButton aria-label="Info" icon={<IconInfoCircle />} onClick={onInfoClick} color="var(--chakra-colors-blue-200)" variant='ghost' />
                )}
            </Flex>

            {alreadyStudied ? (
                <Flex gap={2} align='center'>
                    <Text fontSize='t2' fontWeight={700} color='blue.200'>Already studied today</Text>
                    <IconCircleCheckFilled color="var(--chakra-colors-blue-200)" size='24px'/>
                </Flex>
            ) : (               
                <Flex gap={2} align='center' justify='space-between'>
                    <Text fontSize='t2' fontWeight={700}>Not studied yet</Text>

                    <Button borderRadius='xl' variant='outline' color='blue.200' rightIcon={<IconArrowRight color="var(--chakra-colors-blue-200)" size='24px'/>}>
                        Go to quiz
                    </Button>

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
