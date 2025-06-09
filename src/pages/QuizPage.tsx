import { useContext, useEffect, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { PageHeading } from "@/shared/components/PageHeading"
import { SetupQuiz } from "../features/Quiz/components/SetupQuiz";
import { SolveQuiz } from "../features/Quiz/components/SolveQuiz";
import { QuizResult } from "@/features/Quiz/components/QuizResult";
import { useParams } from "react-router-dom";
import { QuizContext } from '@/features/Quiz/context/QuizContext';
import { Loading } from "../shared/components/Loading";
import { useDeck } from "@/shared/hooks/queries/useDeck";

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
        
        const handleQuizSolved = () => {
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