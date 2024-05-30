import { useEffect, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query";
import { PageHeading } from "../components/PageHeading"
import { SetupQuiz } from "../components/Quiz/SetupQuiz";
import { SolveQuiz } from "../components/Quiz/SolveQuiz";
import { QuizResult } from "../components/Quiz/QuizResult";
import { QuizAnsweredQuestion } from "../model/QuizAnsweredQuestion";
import { updateQuizCards } from "../services/DeckService";
import { QuizStat } from "../model/QuizStat";
import { useLocation } from "react-router-dom";

enum QuizSteps {
    Setup,
    Solve,
    Result
}

export const QuizPage = () => {
        const [currentStep, setCurrentStep] = useState<QuizSteps>(QuizSteps.Setup);
        const [resultCards, setResultCards] = useState<QuizAnsweredQuestion[]>([]);
        const [numberOfCards, setNumberOfCards] = useState<number>(0);

        const { state: deck } = useLocation();
        
        const quizResultMutation = useMutation((resultCards: QuizStat[]) => updateQuizCards(1, resultCards));
        
        const handleQuizSolved = () => {
            const quizStats = resultCards.map(c => ({id: c.flashCard.id!, answerTimeMs: c.answerTimeMs, lastAnswerCorrect: c.lastAnswerCorrect }));
            quizResultMutation.mutate(quizStats);
            setCurrentStep(QuizSteps.Result);
        };

        const handleAnswered = (resultCard: QuizAnsweredQuestion) => {
            setResultCards([...resultCards, resultCard]);
        };

        const renderQuizStep = () => {
            switch(currentStep){
                case QuizSteps.Setup: 
                    return <SetupQuiz deck={deck} onStartQuiz={(numberOfCards) => { setCurrentStep(QuizSteps.Solve); setNumberOfCards(numberOfCards) }} />;
                case QuizSteps.Solve: 
                    return <SolveQuiz deck={deck} numberOfCards={numberOfCards} onAnswered={(resultCard) => handleAnswered(resultCard)} onSolvedQuiz={() => handleQuizSolved()} />
                case QuizSteps.Result: 
                    return <QuizResult deck={deck} resultCards={resultCards} numberOfCards={20}
                        onFinish={() => setCurrentStep(QuizSteps.Setup)} onStartAgain={() => setCurrentStep(QuizSteps.Solve)} />;
            }
        };

        useEffect(() => {
            if(currentStep !== QuizSteps.Result)
                setResultCards([]);
        }, [currentStep]);

        return (
        <Flex direction='column' h='100%'>
            <Box flexGrow={0}>
                <PageHeading title="Quiz" canGoBack />
            </Box>
            <Box px={4} pb={2} flexGrow={1} w='100%'>
                {renderQuizStep()}
            </Box>
        </Flex>
    )
}