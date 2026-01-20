import { Scrollable } from "@/shared/components/Scrollable";
import { Card, CardBody, Flex, Heading, Text, Image } from "@chakra-ui/react";
import percent64Image from '@/assets/images/64percent.png';
import percent90Image from '@/assets/images/90percent.png';
import percent42Image from '@/assets/images/42percent.png';

export const YourGoals = () => {
    const goals: {name: string, percent: number, imageSrc: string}[] = [
        { name: 'Persistent I', percent: 64, imageSrc: percent64Image},
        { name: 'Creative II', percent: 90, imageSrc: percent90Image},
        { name: 'Smart I', percent: 42, imageSrc: percent42Image},
    ]; // TODO: fetch user goals

    return (
        <Flex direction='column' gap={5}>
            <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Your Goals</Heading>
            <Scrollable horizontal>
                <Flex justify='space-between' align='center' gap={2} pb={2}>
                {goals.map(goal => (
                    <Card key={goal.name} flex={1} h='100%' minW='120px'>
                        <CardBody display='flex' flexDirection='column' gap={4} justifyContent='space-between' alignItems='center' p={2}>
                            <Image src={goal.imageSrc} w='98px' h='98px'/>
                            <Flex direction='column' justify='space-between' align='center' h='100%'>
                                <Text fontSize='20px' fontWeight={700} textAlign='center'>{goal.name}</Text>
                                <Text fontSize='20px' fontWeight={700} color='blue.200'>{goal.percent}%</Text>
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
                </Flex>
            </Scrollable>
            
        </Flex>
    );
}