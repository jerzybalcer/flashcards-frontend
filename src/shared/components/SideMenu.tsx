import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getCurrentUser";
import { useAuth } from "../hooks/general/useAuth";

export const SideMenu: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const { logout } = useAuth();
    const currentUser = getCurrentUser();
 
    return (
        <>
            <Box onClick={onOpen}>
                <IconMenu2 size='32px' />
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                <DrawerOverlay />
                    <DrawerContent borderLeftRadius='md'>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex align='center' gap={4}>
                                <Avatar src={currentUser?.imageUrl} name={currentUser?.name}/>
                                <Box minW={0} pr={4}>
                                    <Heading fontSize='t1' as='h1' textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden'>{currentUser?.name}</Heading>
                                    <Text opacity={0.8} fontSize='t2'>{currentUser?.email}</Text>
                                </Box>
                            </Flex>
  
                        </DrawerHeader>
                        <DrawerBody>
                            <Flex direction='column' gap={8} pt={4}>
                                <Button variant='link' onClick={() => navigate('/home')} borderRadius='xl' size='lg' fontSize='h2'>
                                    Dashboard
                                </Button>
                                <Button variant='link' onClick={() => navigate('/decks')} borderRadius='xl' size='lg' fontSize='h2'>
                                    Decks
                                </Button>
                                <Button variant='link' onClick={() => navigate('/stats')} borderRadius='xl' size='lg' fontSize='h2'>
                                    Stats
                                </Button>
                                <Button variant='ghost' colorScheme='red' onClick={logout} borderRadius='xl' size='lg' fontSize='h2' rightIcon={<IconLogout />}>
                                    Logout
                                </Button>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
            </Drawer>
        </>
    )
}