import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";

export const YourGoals = () => {
    const goals: {name: string, percent: number}[] = [
        { name: 'Persistent I', percent: 64},
        { name: 'Creative II', percent: 90},
        { name: 'Smart I', percent: 42},
    ]; // TODO: fetch user goals

    return (
        <Flex direction='column' gap={4}>
            <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Your Goals</Heading>
            <Flex justify='space-between' align='center' gap={2}>
            {goals.map(goal => (
                <Card key={goal.name} h='100%' w='100%'>
                    <CardBody display='flex' flexDirection='column' gap={2}>
                        <Flex direction='column' justify='center' align='center'>
                            <Text fontSize='20px' fontWeight={700}>{goal.name}</Text>
                            <Text fontSize='20px' fontWeight={700} color='blue.200'>{goal.percent}%</Text>
                        </Flex>
                    </CardBody>
                </Card>
            ))}
            </Flex>
        </Flex>
    );
}