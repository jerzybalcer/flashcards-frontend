import { BottomSheet } from "@/shared/components/BottomSheet";
import { Text, Box } from "@chakra-ui/react";
import { IconCheck, IconX } from "@tabler/icons-react";


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
                <Text fontSize='h3' color='green.200'>Correct</Text>
            </>]
        else 
            return [<>
                <Box bg='red.200' borderRadius='50%' p='2px'>
                    <IconX color='black' />
                </Box>
                <Text fontSize='h3' color='red.200'>Incorrect</Text>
            </>]
    }

    function getBody() {
        return [
            <Text fontWeight={400} fontSize='t1'>The answer is:</Text>,
            <Text fontWeight={600} fontSize='t1' color='blue.200'>{correctAnswer}</Text>
        ]
    }

    return (
        <BottomSheet 
            isOpen={isOpen}
            header={getHeader()}
            body={getBody()}
            confirmText="Continue"
            onConfirm={() => onContinue()}
            closeButtonVisible={false}
        />
    );
}