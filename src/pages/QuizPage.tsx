import { useContext, useEffect, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { useMutation } from "react-query";
import { PageHeading } from "../components/PageHeading"
import { SetupQuiz } from "../components/Quiz/SetupQuiz";
import { SolveQuiz } from "../components/Quiz/SolveQuiz";
import { QuizResult } from "../components/Quiz/QuizResult";
import { QuizStat } from "../model/QuizStat";
import { useParams } from "react-router-dom";
import { QuizContext } from './../contexts/QuizContext';
import { Loading } from "../components/Loading";
import { useDeck } from "../hooks/queries/useDeck";
import { useUpdateQuizCards } from "../hooks/mutations/useUpdateQuizCards";

enum QuizSteps {
    Setup,
    Solve,
    Result
}

export const QuizPage = () => {
        const [currentStep, setCurrentStep] = useState<QuizSteps>(QuizSteps.Setup);

        const context = useContext(QuizContext)!;

        const { deckId } = useParams();

        const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));

        const updateQuizCards = useUpdateQuizCards();
        
        const quizResultMutation = useMutation((resultCards: QuizStat[]) => updateQuizCards(1, resultCards));
        
        const handleQuizSolved = () => {
            const quizStats = context.answeredQuestions.map(c => ({id: c.flashCard.id!, answerTimeMs: c.answerTimeMs, lastAnswerCorrect: c.lastAnswerCorrect }));
            quizResultMutation.mutate(quizStats);
            setCurrentStep(QuizSteps.Result);
        };

        const handleStartAgain = () => {
            context.setAnsweredQuestions([]);
            setCurrentStep(QuizSteps.Solve);
        }

        const renderQuizStep = () => {
            if(deckLoading || !deck) return <Loading />;

            switch(currentStep){
                case QuizSteps.Setup: 
                    return <SetupQuiz deck={deck} onStartQuiz={() => setCurrentStep(QuizSteps.Solve)} />;
                case QuizSteps.Solve: 
                    return <SolveQuiz deck={deck} onSolvedQuiz={() => handleQuizSolved()} />
                case QuizSteps.Result: 
                    return <QuizResult deck={deck}
                        onFinish={() => setCurrentStep(QuizSteps.Setup)} onStartAgain={() => handleStartAgain()} />;
            }
        };

        useEffect(() => {
            if(currentStep !== QuizSteps.Result)
                context.setAnsweredQuestions([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currentStep]);

        return (
        <Flex direction='column' h='100%' w='100%'>
            <Box flexGrow={0}>
                <PageHeading title="Quiz" urlToGoBack={`/decks/${deckId}`} />
            </Box>
            <Box px={4} pb={2} flexGrow={1} w='100%'>
                {renderQuizStep()}
            </Box>
        </Flex>
    )
}