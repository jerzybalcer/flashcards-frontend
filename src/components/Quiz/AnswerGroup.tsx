import { Box, Card, Flex, Text, useToken } from "@chakra-ui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { shuffle } from "../../utils/shuffle";

interface AnswerGroupProps {
    correctAnswer: string;
    allAnswers: string[];
    onAnswered: () => void;
}

export const AnswerGroup: React.FC<AnswerGroupProps> = ({ correctAnswer, allAnswers, onAnswered }) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [transparent, white, red500, green500, red800, green800] 
        = useToken('colors', ['transparent', 'white', 'red.500', 'green.500', 'red.800', 'green.800']);

    const getPossibleAnswers = (): string[] => {
        const incorrectAnswers: string[] = [];

        for(let i = 0; i < 3; i++){
            const randomAnswer = getRandomAnswer([correctAnswer, ...incorrectAnswers]);
            incorrectAnswers.push(randomAnswer);
        }

        const possibleAnswers = [correctAnswer, ...incorrectAnswers];

        return shuffle(possibleAnswers) as string[];
    };

    const getRandomAnswer = (except: string[]): string => {
        const possibleAnswers = allAnswers.filter(a => !except.includes(a));
        const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
        return possibleAnswers[randomIndex];
    };

    const getAnswerBorderColor = (answer: string): string => {
        if(!selectedAnswer) return white;
        if(answer === correctAnswer) return green500;
        return red500;
    };

    const getAnswerBackgroundColor = (answer: string): string => {
        if(!selectedAnswer) return transparent;
        if(answer === correctAnswer) return green800;
        return red800;
    };

    const getAnswerOpacity = (answer: string): number => {
        if(!selectedAnswer) return 1.0;

        if(selectedAnswer && answer === correctAnswer) return 1.0;

        if(selectedAnswer && answer === selectedAnswer) return 1.0;

        return 0.4;
    };

    const handleAnswerClick = (answer: string) => {
        if(selectedAnswer) return;
        setSelectedAnswer(answer);
        onAnswered();
    };

    useEffect(() => {
        setSelectedAnswer('');
        setAnswers(getPossibleAnswers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctAnswer]);

    return <Flex direction='column' gap={8} w='100%'>
        {answers.map((answer, index) => 
            <Card key={index} variant='outline' border="solid 2px" transition='border 0.2s' borderRadius='md' p={4} 
                borderColor={getAnswerBorderColor(answer)} backgroundColor={getAnswerBackgroundColor(answer)}
                onClick={() => handleAnswerClick(answer)} opacity={getAnswerOpacity(answer)}
                >
                    <Text>{answer}</Text>

                    {answer === correctAnswer && selectedAnswer &&
                        <Box position='absolute' right={2}>
                            <IconCheck />
                        </Box>
                    }
                    {answer === selectedAnswer && answer !== correctAnswer &&
                        <Box position='absolute' right={2}>
                            <IconX />
                        </Box>
                    }
            </Card>
        )}
    </Flex>
};