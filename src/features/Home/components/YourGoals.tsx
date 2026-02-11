import { Card, CardBody, Flex, Heading, Text, Image } from "@chakra-ui/react";
import percent64Image from '@/assets/images/64percent.png';
import percent90Image from '@/assets/images/90percent.png';
import percent42Image from '@/assets/images/42percent.png';
import { Carousel } from "@/shared/components/Carousel";
import { useGoals } from "@/shared/hooks/queries/useGoals";
import { Loading } from "@/shared/components/Loading";

export const YourGoals = () => {
    const imgs = [percent64Image, percent90Image, percent42Image];

    const { isFetching: goalsLoading, data: goals } = useGoals();

    const top3Goals = goals?.sort((a, b) => b.progress - a.progress).slice(0, 3);

    return (
        <Flex direction='column' gap={5}>
            <Heading as='h2' fontSize='h2' fontFamily='Playwrite US Modern' fontWeight={400}>Your Goals</Heading>
            {goalsLoading && <Loading />}
            {!goalsLoading && top3Goals && (
            <Carousel>
                {top3Goals.map((goal, i) => (
                    <Card key={goal.goalId} flex={1} h='100%' minW='120px'>
                        <CardBody display='flex' flexDirection='column' gap={4} justifyContent='space-between' alignItems='center' p={2}>
                            <Image src={imgs[i%2]} w='98px' h='98px'/>
                            <Flex direction='column' justify='space-between' align='center' h='100%'>
                                <Text fontSize='t1' fontWeight={600} textAlign='center'>{goal.goalName}</Text>
                                <Text fontSize='t2' fontWeight={600} color='blue.200'>{goal.progress}%</Text>
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
            </Carousel>
            )}
        </Flex>
    );
}