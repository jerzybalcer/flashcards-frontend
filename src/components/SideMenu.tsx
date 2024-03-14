import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, useDisclosure } from "@chakra-ui/react"
import { IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const SideMenu: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    return (
        <>
            <Box>
                <IconMenu2 size={32} onClick={onOpen} />
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>
                            <Heading size='2xl'>Menu</Heading>
                        </DrawerHeader>
                        <DrawerBody>
                            <Heading as='h2' size='lg' mb={4}
                                onClick={() => navigate('/cards')}>
                                My Flashcards
                            </Heading>
                            <Heading as='h2' size='lg' mb={4} 
                                onClick={() => navigate('/learn')}>
                                Learn
                            </Heading>
                            <Heading as='h2' size='lg' mb={4} 
                                onClick={() => navigate('/quiz')}>
                                Quiz
                            </Heading>
                        </DrawerBody>
                    </DrawerContent>
            </Drawer>
        </>
    )
}