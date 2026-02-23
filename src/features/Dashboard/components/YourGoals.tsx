import { Card, CardBody, Flex, Heading, Text, Image, useDisclosure } from "@chakra-ui/react";
import percent64Image from '@/assets/images/64percent.png';
import percent90Image from '@/assets/images/90percent.png';
import percent42Image from '@/assets/images/42percent.png';
import { Carousel } from "@/shared/components/Carousel";
import { useGoals } from "@/shared/hooks/queries/useGoals";
import { Loading } from "@/shared/components/Loading";
import { Goal } from "@/model/Goal";
import { useEffect, useState } from "react";
import { GoalDetailsBottomSheet } from "./bottomSheets/GoalDetailsBottomSheet";
import { IconDotsVertical } from "@tabler/icons-react";

export const YourGoals = () => {
    const imgs = [percent64Image, percent90Image, percent42Image];

    const { isFetching: goalsLoading, data: goals } = useGoals();

    const goalDetailsModal = useDisclosure();
    const [currentGoal, setCurrentGoal] = useState<Goal | undefined>(undefined);
    
    function handleGoalDetailsClick(goal: Goal) {
        setCurrentGoal(goal);
        goalDetailsModal.onToggle();
    }

    const top3Goals = goals?.sort((a, b) => b.progress - a.progress).slice(0, 3);

    useEffect(() => {
        if (goals && goals.length > 0) {
            setCurrentGoal(goals[0]);
        }
    }, [goals])

    return (
        <Flex direction='column' gap={5}>
            <Heading as='h2' fontSize='h2' fontFamily='Playwrite US Modern' fontWeight={400}>Your Goals</Heading>
            {goalsLoading && <Loading />}
            {!goalsLoading && top3Goals && (
            <Carousel>
                {top3Goals.map((goal, i) => (
                    <Card key={goal.goalId} flex={1} h='100%' minW='120px' borderRadius='xl' onClick={() => handleGoalDetailsClick(goal)}>
                        <CardBody display='flex' flexDirection='column' gap={4} justifyContent='space-between' alignItems='center'>
                            <IconDotsVertical size='32px' color="var(--chakra-colors-blue-200)" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem'}} />
                            <Flex direction='column' justify='space-between' align='center' w='100%' gap={2}>
                                <Image src={imgs[i%2]} w='98px' h='98px' mb={2}/>
                                <Text fontSize='t1' fontWeight={600} textAlign='center'>{goal.goalName}</Text>
                                <Text fontSize='t2' fontWeight={500} color='blue.200'>{goal.progress}%</Text>
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
            </Carousel>
            )}
            {currentGoal && (
                <GoalDetailsBottomSheet isOpen={goalDetailsModal.isOpen} onClose={goalDetailsModal.onClose} goal={currentGoal} />
            )}
        </Flex>
    );
}