import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getQuizCards } from "../../services/DeckService";
import { Loading } from "../Loading";
import { AnswerGroup } from "./AnswerGroup";
import { QuizFlashCard } from "../../model/QuizFlashCard";
import { FittedText } from "../FittedText";
import { Deck } from "../../model/Deck";
import { ProgressBar } from "../ProgressBar";
import { QuizMode } from "../../model/QuizMode";

interface SolveQuizProps {
    deck: Deck;
    onAnswered: (resultCard: QuizFlashCard) => void;
    onSolvedQuiz: () => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = ({ deck, onAnswered, onSolvedQuiz }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [startTimeMs, setStartTimeMs] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const wordContainerRef = useRef<HTMLDivElement>(null);
    
    const { data: cards, isLoading: cardsLoading } = 
        useQuery(`quizCards-deck=${deck.id}`, () => getQuizCards(Number(deck.id), 20, QuizMode.SingleChoice), { staleTime: Infinity });

    const currentCard = () => cards![currentIndex - 1];

    const handleNext = () => {
        if(currentIndex < cards!.length)
            setCurrentIndex(currentIndex + 1)
        else
            onSolvedQuiz();
    };

    const handleOnAnswered = () => {
        const resultFlashCard: QuizFlashCard = {
            id: currentCard().id!,
            foreignWord: currentCard().foreignWord,
            translatedWord: currentCard().translatedWord,
            lastAnswerCorrect: answer === currentCard().translatedWord,
            answerTimeMs: new Date().getTime() - startTimeMs
        }

        onAnswered(resultFlashCard);
        handleNext();
    };

    useEffect(() => {
        setAnswer('');
        setStartTimeMs(new Date().getTime());
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
                            <FittedText maxFontSize={24} content={currentCard().foreignWord} containerRef={wordContainerRef} color='blue.200' />
                        </Box>
                    </Flex>

                </Flex>
                
                <Box w='100%'>
                    <AnswerGroup correctAnswer={currentCard().translatedWord} allAnswers={cards.map(c => c.translatedWord)} 
                        onAnswerChosen={(answer) => setAnswer(answer)}/>
                </Box>

                <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => handleOnAnswered()} isDisabled={!answer}>Continue</Button>
            </Flex>
            )
        }
    </Flex>;
};