import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";

export const YourWordForToday = () => {
    return (
        <Flex direction="column" gap={4}>
            <Flex justify='space-between'>
                <Heading size="md">Your word for today</Heading>
                <IconInfoCircle color="var(--chakra-colors-blue-200)"/>
            </Flex>
            <Card onClick={() => {}}>
                <CardBody gap={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Text fontSize='32px' userSelect='text' color='blue.200'>los zapatos</Text>
                    <Text fontSize='20px' userSelect='text'>buty</Text>
                </CardBody>
            </Card>
        </Flex>
    );
}