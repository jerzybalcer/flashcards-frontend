import { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { PageHeading } from "../components/PageHeading"
import { SetupQuiz } from "../components/Quiz/SetupQuiz";
import { SolveQuiz } from "../components/Quiz/SolveQuiz";
import { QuizResult } from "../components/Quiz/QuizResult";

export const QuizPage = () => {
        const [currentStep, setCurrentStep] = useState<number>(0);

        const renderQuizStep = () => {
            switch(currentStep){
                case 0: return <SetupQuiz onStartQuiz={() => setCurrentStep(1)} />;
                case 1: return <SolveQuiz onSolvedQuiz={() => setCurrentStep(2)} />
                case 2: return <QuizResult onFinish={() => setCurrentStep(0)} onStartAgain={() => setCurrentStep(1)}/>;
            }
        };

        return (
        <Flex direction='column' h='100dvh'>
            <Box flexGrow={0}>
                <PageHeading title="Quiz" />
            </Box>
            <Box px={4} pb={8} flexGrow={1} w='100%'>
                {renderQuizStep()}
            </Box>
        </Flex>
    )
}