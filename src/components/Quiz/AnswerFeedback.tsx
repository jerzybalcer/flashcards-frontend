import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Button, Text, DrawerFooter, Box, Heading } from "@chakra-ui/react";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AnswerFeedbackProps {
    isOpen: boolean;
    answer: string;
    correctAnswer: string;
    onContinue: () => void;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ isOpen, answer, correctAnswer, onContinue }) => {
    return (
    <Drawer isOpen={isOpen} placement='bottom' onClose={() => {}}>
    <DrawerOverlay />
    <DrawerContent borderTopRadius='md'>
        <DrawerHeader display='flex' alignItems='center' gap={2}>
            {answer === correctAnswer
            ? <>
                <Box bg='green.200' borderRadius='50%' p='2px'>
                    <IconCheck color='black' />
                </Box>
                <Text color='green.200'>Correct</Text>
            </>
            : <>
                <Box bg='red.200' borderRadius='50%' p='2px'>
                    <IconX color='black' />
                </Box>
                <Text color='red.200'>Incorrect</Text>
            </>
            }
        </DrawerHeader>

        <DrawerBody display='flex' flexDirection='column' gap={2}>
            <Heading size='md'>The answer is:</Heading>
            <Text fontSize='xl' color='blue.200'>{correctAnswer}</Text>
        </DrawerBody>

        <DrawerFooter w='100%'>
            <Button w='100%' py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onContinue()}>Continue</Button>
        </DrawerFooter>
    </DrawerContent>
    </Drawer>
    );
}