import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";

export const YourWordForToday = () => {
    return (
        <Flex direction="column" gap={5}>
            <Flex justify='space-between' align='center'>
                <Heading fontSize='24px' fontFamily='Playwrite US Modern' fontWeight={400}>Your words for today</Heading>
                <IconInfoCircle size='32px' strokeWidth={1.5} color="var(--chakra-colors-blue-200)"/>
            </Flex>
            <Card onClick={() => {}}>
                <CardBody gap={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Text fontSize='32px' fontWeight={700} userSelect='text' color='blue.200'>los zapatos</Text>
                    <Text fontSize='20px' fontWeight={700} userSelect='text'>buty</Text>
                </CardBody>
            </Card>
        </Flex>
    );
}