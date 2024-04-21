import { useEffect, useState } from "react";
import { Box, Button, Card, CardBody, Center, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import {  getQuizCards } from "../../services/CardService";
import { Loading } from "../Loading";
import { AnswerGroup } from "./AnswerGroup";
import { QuizResultFlashCard } from "../../model/QuizResultFlashCard";

interface SolveQuizProps {
    onSolvedQuiz: (resultCards: QuizResultFlashCard[]) => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = ({ onSolvedQuiz }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [resultCards, setResultCards] = useState<QuizResultFlashCard[]>([]);

    const { data: cards, isLoading: cardsLoading } = useQuery('quizCards', getQuizCards, {staleTime: Infinity});

    const currentCard = () => cards![currentIndex - 1];

    const handleNext = () => {
        if(currentIndex < cards!.length)
            setCurrentIndex(currentIndex + 1)
        else
            onSolvedQuiz(resultCards);
    };

    const handleOnAnswered = (answer: string) => {
        setIsAnswered(true);

        const resultFlashCard: QuizResultFlashCard = {
            id: currentCard().id!,
            lastAnswerCorrect: answer === currentCard().translatedWord,
            answerTimeMs: 1000
        }

        setResultCards([...resultCards, resultFlashCard]);
    };

    useEffect(() => {
        setIsAnswered(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cards]);

    return <Flex direction='column' justify='center' align='center' h='100%' w='100%'>
        {cardsLoading && <Loading />}
        {!cardsLoading && cards && 
            (
                <Flex direction='column' h='100%' w='100%' justify='space-between' align='center' gap={8}>
                    <Flex direction='column' w='100%' gap={8} flexGrow={1}>
                        <Flex justify='space-between'>
                            <Flex gap={2}>
                                <Text>Deck: </Text>
                                <Text fontWeight={500}>Italiano</Text>
                            </Flex>
                            <Text>{currentIndex} / {cards?.length ?? 1}</Text>
                        </Flex>

                        <Card w='100%' p={4} flexGrow={1}>
                            <CardBody h='100%'>
                                <Center h='100%'>
                                    <Text fontSize={32}>{currentCard().foreignWord}</Text>
                                </Center>
                            </CardBody>
                        </Card>
                    </Flex>

                    <Box w='100%'>
                        <AnswerGroup correctAnswer={currentCard().translatedWord} allAnswers={cards.map(c => c.translatedWord)} 
                            onAnswered={(answer) => handleOnAnswered(answer)}/>
                    </Box>

                    <Button visibility={isAnswered ? 'visible' : 'hidden'} w='100%' p={4} 
                        onClick={() => handleNext()}>
                            {currentIndex !== cards.length ? 'Next' : 'Finish'}
                    </Button>
                </Flex>
            )
        }
    </Flex>;
};