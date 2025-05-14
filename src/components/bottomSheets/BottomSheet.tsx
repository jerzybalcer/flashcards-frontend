import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, IconButton, Flex } from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";

interface Props {
    isOpen: boolean;
    header: JSX.Element[];
    body: JSX.Element[];
    confirmText: string;
    onConfirm: () => void;
    isConfirmLoading?: boolean;
    canClose?: boolean;
    onClose?: () => void;
}

export const BottomSheet: React.FC<Props> = ({ isOpen, header, body, confirmText, onConfirm, canClose = true, onClose, isConfirmLoading = false }) => {

    function handleClose() {
        if(onClose) onClose();
    }

    return (
        <Drawer isOpen={isOpen} placement='bottom' onClose={() => handleClose()}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius='md' mx='auto' w='95vw'>
            {/* <Box borderRadius='xl' width='50px' height='5px' mt={4} mx='auto' background='#5f6774' opacity={0.8}></Box> */}

            <DrawerHeader display='flex' alignItems='center' justifyContent='space-between' gap={2} w='100%'>
                <Flex alignItems='center' w='100%' gap={2}>
                    {...header}
                </Flex>
                {canClose && <IconButton icon={<IconX/>} aria-label="close" variant='ghost' onClick={() => handleClose()}/>}
            </DrawerHeader>
    
            <DrawerBody display='flex' flexDirection='column' gap={2}>
                {...body}
            </DrawerBody>
    
            <DrawerFooter w='100%'>
                <Button w='100%' py={6} mt={2} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onConfirm()} isLoading={isConfirmLoading}>{confirmText}</Button>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    );
}