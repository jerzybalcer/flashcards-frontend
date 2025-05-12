import { Text, Box, Heading } from "@chakra-ui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BottomSheet } from "../BottomSheet";

interface Props {
    isOpen: boolean;
    answer: string;
    correctAnswer: string;
    onContinue: () => void;
}

export const AnswerFeedbackBottomSheet: React.FC<Props> = ({ isOpen, answer, correctAnswer, onContinue }) => {

    function getHeader() {
        if(answer === correctAnswer)
            return [<>
                <Box bg='green.200' borderRadius='50%' p='2px'>
                    <IconCheck color='black' />
                </Box>
                <Text color='green.200'>Correct</Text>
            </>]
        else 
            return [<>
                <Box bg='red.200' borderRadius='50%' p='2px'>
                    <IconX color='black' />
                </Box>
                <Text color='red.200'>Incorrect</Text>
            </>]
    }

    function getBody() {
        return [
            <Heading size='md'>The answer is:</Heading>,
            <Text fontSize='xl' color='blue.200'>{correctAnswer}</Text>
        ]
    }

    return (
        <BottomSheet 
            isOpen={isOpen}
            header={getHeader()}
            body={getBody()}
            confirmText="Continue"
            onConfirm={() => onContinue()}
            canClose={false}
        />
    );
}