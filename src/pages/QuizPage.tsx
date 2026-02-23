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

enum QuizStep {
    Setup,
    Solve,
    Result
}

interface Props {
    useDailyCards?: boolean;
}

export const QuizPage: React.FC<Props> = ({ useDailyCards = false }) => {
        const [currentStep, setCurrentStep] = useState<QuizStep>(useDailyCards ? QuizStep.Solve : QuizStep.Setup);

        const context = useContext(QuizContext)!;

        const { deckId } = useParams();

        const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));
        
        const handleQuizSolved = () => {
            setCurrentStep(QuizStep.Result);
        };

        const handleStartAgain = () => {
            context.setAnsweredQuestions([]);
            setCurrentStep(QuizStep.Solve);
        }

        const renderQuizStep = () => {
            if(deckLoading || !deck) return <Loading />;

            switch(currentStep){
                case QuizStep.Setup: 
                    return <SetupQuiz deck={deck} onStartQuiz={() => setCurrentStep(QuizStep.Solve)} />;
                case QuizStep.Solve: 
                    return <SolveQuiz deck={deck} useDailyCards={useDailyCards} onSolvedQuiz={() => handleQuizSolved()} />
                case QuizStep.Result: 
                    return <QuizResult deck={deck}
                        onFinish={() => setCurrentStep(QuizStep.Setup)} onStartAgain={() => handleStartAgain()} />;
            }
        };

        useEffect(() => {
            if(currentStep !== QuizStep.Result)
                context.setAnsweredQuestions([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currentStep]);

        return (
        <Flex direction='column' h='100%' w='100%'>
            <Box flexGrow={0}>
                <PageHeading title="Quiz" urlToGoBack={`/decks/${deckId}`} />
            </Box>
            <Box flexGrow={1} w='100%'>
                {renderQuizStep()}
            </Box>
        </Flex>
    )
}