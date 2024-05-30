import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getQuizCards } from "../../services/DeckService";
import { Loading } from "../Loading";
import { AnswerGroup } from "./AnswerGroup";
import { QuizAnsweredQuestion } from "../../model/QuizAnsweredQuestion";
import { FittedText } from "../FittedText";
import { Deck } from "../../model/Deck";
import { ProgressBar } from "../ProgressBar";

interface SolveQuizProps {
    deck: Deck;
    numberOfCards: number;
    onAnswered: (resultCard: QuizAnsweredQuestion) => void;
    onSolvedQuiz: () => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = ({ deck, numberOfCards, onAnswered, onSolvedQuiz }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [startTimeMs, setStartTimeMs] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
    const wordContainerRef = useRef<HTMLDivElement>(null);
    
    const { data: cards, isLoading: cardsLoading } = 
        useQuery(`quizCards-deck=${deck.id}`, () => getQuizCards(Number(deck.id), numberOfCards), { staleTime: Infinity });

    const currentCard = () => cards![currentIndex - 1];

    const handleNext = () => {
        if(currentIndex < cards!.length)
            setCurrentIndex(currentIndex + 1)
        else
            onSolvedQuiz();
    };

    const handleOnAnswered = () => {
        const resultFlashCard: QuizAnsweredQuestion = {
            flashCard: currentCard(),
            lastAnswerCorrect: answer === currentCard().translatedWord,
            answerTimeMs: new Date().getTime() - startTimeMs
        }

        onAnswered(resultFlashCard);
        handleNext();
    };

    useEffect(() => {
        setAnswer('');
        setStartTimeMs(new Date().getTime());
        setPossibleAnswers(cards ? [...currentCard().wrongAnswers, currentCard().foreignWord] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cards]);

    return <Flex direction='column' justify='center' align='center' h='100%' w='100%'>
        {cardsLoading && <Loading />}
        {!cardsLoading && cards && 
            (
            <Flex h='100%' w='100%' direction='column' justify='space-between'>

                <Flex direction='column' gap={6} h='30%'>
                    <ProgressBar currentValue={currentIndex} maxValue={cards.length} />

                    <Flex direction='column' flexGrow={1} gap={2}>
                        <Heading size='lg'>Choose translation for:</Heading>
                        <Box flexGrow={1} ref={wordContainerRef} borderRadius='md'>
                            <FittedText maxFontSize={24} content={currentCard().translatedWord} containerRef={wordContainerRef} color='blue.200' />
                        </Box>
                    </Flex>

                </Flex>
                
                <Box w='100%'>
                    <AnswerGroup answers={possibleAnswers} 
                        onAnswerChosen={(answer) => setAnswer(answer)}/>
                </Box>

                <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => handleOnAnswered()} isDisabled={!answer}>Continue</Button>
            </Flex>
            )
        }
    </Flex>;
};