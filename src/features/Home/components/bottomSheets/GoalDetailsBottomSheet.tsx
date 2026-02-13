import { Center, Flex, Text, Image } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Goal } from "@/model/Goal";
import percent64Image from '@/assets/images/64percent.png';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    goal: Goal;
}

export const GoalDetailsBottomSheet: React.FC<Props> = ({ isOpen, onClose, goal }) => {
    function getHeader() {
        return <Center w='100%'>
            <Image src={percent64Image} w='98px' h='98px'/>
        </Center>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' mb='30px'>
            <Flex direction='column' justify='space-between' align='center' gap='30px' textAlign='center'>
                <Text display='inline-block' fontSize='h2' fontWeight={700}>{goal.goalName}</Text>
                <Text display='inline-block' fontSize='t1' fontWeight={400} color='blue.200'>{goal.goalDescription}</Text>
                <Text display='inline-block' fontSize='bd' fontWeight={400}>{goal.progress}% complete</Text>
            </Flex>
        </Flex>;
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Close" onConfirm={onClose} onClose={onClose} closeButtonVisible={false}  />
}