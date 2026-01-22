import { Center, Flex, Text, useTheme } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { IconCalendarWeek } from '@tabler/icons-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const YourWordsForTodayBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
    const blue200 = useTheme().colors.blue[200];

    function getHeader() {
        return <Center w='100%'>
            <IconCalendarWeek size='60px' strokeWidth={1.5} color={blue200}/>
        </Center>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' mb='30px'>
            <Flex direction='column' justify='space-between' align='center' gap='30px' textAlign='center'>
                <Text display='inline-block' fontSize='30px' fontWeight={400} fontFamily='Playwrite US Modern'>Your words for today</Text>
                <Text display='inline-block' fontSize='20px' fontWeight={700} color='blue.200'>Daily selected words you struggled with in previous quizzes and may need to study again.</Text>
            </Flex>
        </Flex>;
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Take a Quiz" onConfirm={() => {}} onClose={onClose} closeButtonVisible={true}  />
}