import { useEffect, useState } from "react";
import { Box, Button, Card, CardBody, Center, Flex, Text, useToken } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getCards } from "../../services/CardService";
import { Loading } from "../Loading";
import { FlashCard } from "../../model/FlashCard";
import { shuffle } from "../../utils/shuffle";
import { IconCheck } from "@tabler/icons-react";

interface SolveQuizProps {
    onSolvedQuiz: () => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [transparent, white, red500, green500, red800, green800] 
        = useToken('colors', ['transparent', 'white', 'red.500', 'green.500', 'red.800', 'green.800']);

    const { data: cards, isLoading: cardsLoading } = useQuery('quizCards', getCards);

    const currentCard = () => cards![currentIndex - 1];

    const getPossibleAnswers = (): string[] => {
        const correctAnswer = currentCard().translatedWord;
        const otherCards: FlashCard[] = [];

        for(let i = 0; i < 3; i++){
            const otherCardsIndexes = otherCards.map((_, index) => index);
            const exceptIndexes = [cards!.indexOf(currentCard()), ...otherCardsIndexes];
            const randomCardIndex = getRandomCardIndex(exceptIndexes);
            otherCards.push(cards![randomCardIndex]);
        }

        const otherAnswers = otherCards.map(c => c.translatedWord);
        const allAnswers = [correctAnswer, ...otherAnswers];

        return shuffle(allAnswers) as string[];
    };

    const getRandomCardIndex = (except: number[]): number => {
        const possibleIndexes = cards!.map((_, index) => index).filter(i => !except.includes(i));
        return Math.floor(Math.random() * possibleIndexes.length);
    };

    const getAnswerBorderColor = (answer: string): string => {
        if(!isAnswered) return white;
        if(answer === currentCard().translatedWord) return green500;
        return red500;
    };

    const getAnswerBackgroundColor = (answer: string): string => {
        if(!isAnswered) return transparent;
        if(answer === currentCard().translatedWord) return green800;
        return red800;
    };

    const getAnswerOpacity = (answer: string): number => {
        if(isAnswered && answer !== currentCard().translatedWord) return 0.4;

        return 1.0;
    };

    useEffect(() => {
        setIsAnswered(false);

        if(cards)
            setAnswers(getPossibleAnswers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cards]);

    return <Flex direction='column' justifyContent='center' align='center' h='100%'>
        {cardsLoading && <Loading />}
        {!cardsLoading && cards && 
            (
                <Flex direction='column' h='100%'>
                    <Flex justifyContent='space-between' mb={8}>
                        <Flex justify='left' gap={2}>
                            <Text>Deck: </Text>
                            <Text fontWeight={500}>Italiano</Text>
                        </Flex>
                        <Text>
                            {currentIndex} / {cards?.length ?? 1}
                        </Text>
                    </Flex>

                    <Card w='400px' h='200px' mb={16} p={4}>
                        <CardBody h='100%'>
                            <Center h='100%'>
                                <Text fontSize={32}>{currentCard().foreignWord}</Text>
                            </Center>
                        </CardBody>
                    </Card>

                    <Flex direction='column' gap={8} mb={8}>
                        {answers.map(answer => 
                            <Card variant='outline' border="solid 2px" transition='border 0.2s' borderRadius='md' py={4} px={2} 
                                borderColor={getAnswerBorderColor(answer)} backgroundColor={getAnswerBackgroundColor(answer)}
                                onClick={() => setIsAnswered(true)} opacity={getAnswerOpacity(answer)} key={answer}
                                >
                                    <Text>{answer}</Text>
                                    {answer === currentCard().translatedWord && isAnswered &&
                                    <Box position='absolute' right={2}>
                                        <IconCheck />
                                    </Box>}
                            </Card>
                        )}
                    </Flex>

                    {isAnswered && <Button p={4} onClick={() => setCurrentIndex(currentIndex + 1)}>Next</Button>}
                </Flex>
            )
        }
    </Flex>;
};