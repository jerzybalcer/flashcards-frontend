import { useEffect, useState } from "react";
import { Box, Button, Card, CardBody, Center, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import {  getQuizCards } from "../../services/CardService";
import { Loading } from "../Loading";
import { AnswerGroup } from "./AnswerGroup";

interface SolveQuizProps {
    onSolvedQuiz: () => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const { data: cards, isLoading: cardsLoading } = useQuery('quizCards', getQuizCards, {staleTime: Infinity});

    const currentCard = () => cards![currentIndex - 1];

    useEffect(() => {
        setIsAnswered(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cards]);

    return <Flex direction='column' justify='center' align='center' h='100%' w='100%'>
        {cardsLoading && <Loading />}
        {!cardsLoading && cards && 
            (
                <Flex direction='column' h='100%' w='100%' justify='space-between' align='center' gap={8}>
                    <Flex direction='column' w='100%' gap={8} pb={8} flexGrow={1}>
                        <Flex justify='space-between'>
                            <Flex gap={2}>
                                <Text>Deck: </Text>
                                <Text fontWeight={500}>Italiano</Text>
                            </Flex>
                            <Text>{currentIndex} / {cards?.length ?? 1}</Text>
                        </Flex>

                        {/* <Card w='100%' p={4} flexGrow={1}>
                            <CardBody h='100%'>
                                <Center h='100%'>
                                    <Text fontSize={32}>{currentCard().foreignWord}</Text>
                                </Center>
                            </CardBody>
                        </Card> */}
                    </Flex>

                    <Box w='100%'>
                        <AnswerGroup correctAnswer={currentCard().translatedWord} allAnswers={cards.map(c => c.translatedWord)} 
                            onAnswered={() => setIsAnswered(true)}/>
                    </Box>

                    <Button visibility={isAnswered ? 'visible' : 'hidden'} w='100%' p={4} 
                        onClick={() => setCurrentIndex(currentIndex + 1)}>
                            Next
                    </Button>
                </Flex>
            )
        }
    </Flex>;
};