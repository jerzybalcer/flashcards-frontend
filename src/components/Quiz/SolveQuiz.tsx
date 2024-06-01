import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getQuizCards } from "../../services/DeckService";
import { Loading } from "../Loading";
import { AnswerGroup } from "./AnswerGroup";
import { QuizAnsweredQuestion } from "../../model/QuizAnsweredQuestion";
import { FittedText } from "../FittedText";
import { Deck } from "../../model/Deck";
import { ProgressBar } from "../ProgressBar";
import { QuizContext } from "../../contexts/QuizContext";

interface SolveQuizProps {
    deck: Deck;
    onSolvedQuiz: () => void;
}

export const SolveQuiz: React.FC<SolveQuizProps> = ({ deck, onSolvedQuiz }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [startTimeMs, setStartTimeMs] = useState<number>(0);
    const [currentAnswer, setCurrentAnswer] = useState<string>('');
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
    const wordContainerRef = useRef<HTMLDivElement>(null);

    const context = useContext(QuizContext)!;
    
    const { data: cards, isFetching: cardsLoading } = 
        useQuery(`quizCards-deck=${deck.id}`, () => getQuizCards(Number(deck.id), context.numberOfCards), { staleTime: Infinity });

    const currentCard = () => cards![currentIndex - 1];

    const handleNext = () => {
        if(currentIndex < cards!.length)
            setCurrentIndex(currentIndex + 1)
    };

    const handleOnAnswered = () => {
        const answeredQuestion: QuizAnsweredQuestion = {
            flashCard: currentCard(),
            lastAnswerCorrect: currentAnswer === currentCard().foreignWord,
            answerTimeMs: new Date().getTime() - startTimeMs
        }

        context.setAnsweredQuestions([...context.answeredQuestions, answeredQuestion]);
        handleNext();
    };

    useEffect(() => {
        setCurrentAnswer('');
        setStartTimeMs(new Date().getTime());
        setPossibleAnswers(cards ? [...currentCard().wrongAnswers, currentCard().foreignWord] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cards]);

    useEffect(() => { // Using effect because onSolvedQuiz must wait for answeredQuestions state to be set
        if(context.answeredQuestions.length === context.numberOfCards){
            onSolvedQuiz();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.answeredQuestions]);

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
                        onAnswerChosen={(answer) => setCurrentAnswer(answer)}/>
                </Box>

                <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => handleOnAnswered()} isDisabled={!currentAnswer}>Continue</Button>
            </Flex>
            )
        }
    </Flex>;
};