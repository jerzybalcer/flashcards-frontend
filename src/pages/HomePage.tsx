import { Card, Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "../components/SideMenu"

export const HomePage = () => {
    return (
        <Flex direction='column' h='100%' gap={12}>
            <Flex justify='space-between' align='center' gap={4}>
                <Heading size='2xl'>Hello, Rafał</Heading>
                <SideMenu />
            </Flex>
            <Flex direction='column' px={4} pb={2} flexGrow={1} gap={8}>
                <Flex flexGrow={1} direction='column' gap={2}>
                    <Heading size='md'>Recommended</Heading>
                    <Card borderRadius='md' w='100%' h='100%'></Card>
                </Flex>
                <Flex flexGrow={1} direction='column' gap={2}>
                    <Heading size='md'>Stats</Heading>
                    <Card borderRadius='md' w='100%' h='100%'></Card>
                </Flex>
                <Flex flexGrow={1} direction='column' gap={2}>
                    <Heading size='md'>Decks</Heading>
                    <Card borderRadius='md' w='100%' h='100%'></Card>
                </Flex>
            </Flex>
        </Flex>
    )
}