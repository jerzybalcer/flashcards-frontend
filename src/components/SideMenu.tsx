import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const SideMenu: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    return (
        <>
            <Box onClick={onOpen}>
                <Avatar src='https://s3.envato.com/files/303471944/200607-Ph1-0662.jpg'/>
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                <DrawerOverlay />
                    <DrawerContent m={4} borderRadius='md'>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex align='center' gap={4}>
                                <Avatar src='https://s3.envato.com/files/303471944/200607-Ph1-0662.jpg'/>
                                <Box minW={0} pr={4}>
                                    <Heading size='md' textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden'>Rafał Smykała</Heading>
                                    <Text opacity={0.8} fontSize='md'>@r_smykalka</Text>
                                </Box>
                            </Flex>
  
                        </DrawerHeader>
                        <DrawerBody>
                            <Flex direction='column' gap={4}>
                                <Heading as='h2' size='lg'
                                    onClick={() => navigate('/home')}>
                                    Home
                                </Heading>
                                <Heading as='h2' size='lg'
                                    onClick={() => navigate('/decks')}>
                                    Decks
                                </Heading>
                                <Heading as='h2' size='lg'
                                    onClick={() => navigate('/stats')}>
                                    Stats
                                </Heading>
                                <Heading as='h2' size='lg' mt={8}
                                    onClick={() => {}}>
                                    Settings
                                </Heading>
                                <Heading as='h2' size='lg'
                                    onClick={() => {}}>
                                    Logout
                                </Heading>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
            </Drawer>
        </>
    )
}