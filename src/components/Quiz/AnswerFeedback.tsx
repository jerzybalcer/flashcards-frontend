import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Button, Text, DrawerFooter } from "@chakra-ui/react";

interface AnswerFeedbackProps {
    isOpen: boolean;
    translatedWord: string;
    answer: string;
    correctAnswer: string;
    onContinue: () => void;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ isOpen, translatedWord, answer, correctAnswer, onContinue }) => {
    return (
    <Drawer isOpen={isOpen} placement='bottom' onClose={() => {}}>
    <DrawerOverlay />
    <DrawerContent borderTopRadius='md'>
        {answer === correctAnswer 
            ? <DrawerHeader color='green.200'>Correct answer!</DrawerHeader>
            : <DrawerHeader color='red.200'>Wrong answer...</DrawerHeader>
        }

        <DrawerBody display='flex' flexDirection='column' gap={4}>
            <Text>{translatedWord} - {correctAnswer}</Text>
        </DrawerBody>

        <DrawerFooter w='100%'>
            <Button w='100%' py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onContinue()}>Continue</Button>
        </DrawerFooter>
    </DrawerContent>
    </Drawer>
    );
}