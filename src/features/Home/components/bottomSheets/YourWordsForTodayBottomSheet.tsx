import { Center, Flex, Text, useTheme } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { IconInfoCircle } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const YourWordsForTodayBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
    const blue200 = useTheme().colors.blue[200];

    const alreadyStudied: boolean = Math.random() < 0.5; // TODO: replace with actual logic

    function getHeader() {
        return <Center w='100%'>
            <IconInfoCircle size='60px' strokeWidth={1.5} color={blue200}/>
        </Center>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' mb='30px'>
            <Flex direction='column' justify='space-between' align='center' gap='30px' textAlign='center'>
                <Text display='inline-block' fontSize='h2' fontWeight={400} fontFamily='Playwrite US Modern'>Your words for today</Text>
                <Text display='inline-block' fontSize='t1' fontWeight={400}>Daily selected words you struggled with in previous quizzes and may need to study again.</Text>
            </Flex>
        </Flex>;
    }

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate(`/decks/3/quiz/daily`); // TODO: insert deck id
    }

    if(alreadyStudied){
        return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Close" onConfirm={onClose} onClose={onClose} closeButtonVisible={false}  />

    }else{
        return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Start quiz" onConfirm={() => handleStartQuiz()} onClose={onClose} closeButtonVisible={true}  />
    }
}