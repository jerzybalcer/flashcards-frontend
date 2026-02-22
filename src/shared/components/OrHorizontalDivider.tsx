import { Flex, Divider, Text } from "@chakra-ui/react";

export const OrHorizontalDivider = () => {
    return (
    <Flex align='center' justify='center' gap={2}>
        <Divider w='40%'/>
        <Text opacity={0.8}>or</Text>
        <Divider w='40%'/>
    </Flex>
    );
}
