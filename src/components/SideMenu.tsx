import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/general/useAuth";

export const SideMenu: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <>
            <Box onClick={onOpen}>
                <IconMenu2 strokeWidth={1.25} size={36} opacity={0.8}/>
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                <DrawerOverlay />
                    <DrawerContent borderLeftRadius='md'>
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
                                    onClick={() => auth?.logout()}>
                                    Logout
                                </Heading>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
            </Drawer>
        </>
    )
}