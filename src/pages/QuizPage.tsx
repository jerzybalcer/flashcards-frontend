import { useEffect, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { useMutation } from "react-query";
import { PageHeading } from "../components/PageHeading"
import { SetupQuiz } from "../components/Quiz/SetupQuiz";
import { SolveQuiz } from "../components/Quiz/SolveQuiz";
import { QuizResult } from "../components/Quiz/QuizResult";
import { QuizFlashCard } from "../model/QuizFlashCard";
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
        const [resultCards, setResultCards] = useState<QuizFlashCard[]>([]);

        const { state: deck } = useLocation();
        
        const quizResultMutation = useMutation((resultCards: QuizStat[]) => updateQuizCards(1, resultCards));
        
        const handleQuizSolved = () => {
            const quizStats = resultCards.map(c => ({id: c.id, answerTimeMs: c.answerTimeMs, lastAnswerCorrect: c.lastAnswerCorrect }));
            quizResultMutation.mutate(quizStats);
            setCurrentStep(QuizSteps.Result);
        };

        const handleAnswered = (resultCard: QuizFlashCard) => {
            setResultCards([...resultCards, resultCard]);
        };

        const renderQuizStep = () => {
            switch(currentStep){
                case QuizSteps.Setup: 
                    return <SetupQuiz deck={deck} onStartQuiz={() => setCurrentStep(QuizSteps.Solve)} />;
                case QuizSteps.Solve: 
                    return <SolveQuiz deck={deck} onAnswered={(resultCard) => handleAnswered(resultCard)} onSolvedQuiz={() => handleQuizSolved()} />
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