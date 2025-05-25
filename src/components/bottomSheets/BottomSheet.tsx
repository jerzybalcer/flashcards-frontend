import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Flex } from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    header: JSX.Element[];
    body: JSX.Element[];
    confirmText: string;
    confirmIcon?: JSX.Element;
    onConfirm: () => void;
    isConfirmLoading?: boolean;
    canClose?: boolean;
    onClose?: () => void;
}

export const BottomSheet: React.FC<Props> = ({ isOpen, header, body, confirmText, confirmIcon, onConfirm, canClose = true, onClose, isConfirmLoading = false }) => {
    function handleClose() {
        if(onClose) onClose();
    }

    return (
        <Drawer isOpen={isOpen} placement='bottom' onClose={() => handleClose()} autoFocus={false} returnFocusOnClose={false}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius='md'>
            {/* DRAGGING HANDLE */}
            {/* <Box borderRadius='xl' width='50px' height='5px' mt={4} mx='auto' background='#5f6774' opacity={0.8}></Box> */}

            <DrawerHeader display='flex' alignItems='center' justifyContent='space-between' gap={2} w='100%'>
                <Flex alignItems='center' w='100%' gap={2}>
                    {...header}
                </Flex>
            </DrawerHeader>
                
            <DrawerBody display='flex' flexDirection='column' gap={2}>
                {...body}
            </DrawerBody>
    
            <DrawerFooter w='100%'>
                <Flex w='100%' gap={2} direction='column' justifyContent='space-between' align='center'>
                    <Button 
                        w='100%' py={6} mt={2} 
                        fontSize='lg' 
                        borderRadius='xl' 
                        colorScheme='blue'
                        onClick={() => onConfirm()} 
                        isLoading={isConfirmLoading}
                        leftIcon={confirmIcon}
                    >
                        {confirmText}
                    </Button>
                    {canClose && 
                        <Button 
                            w='100%' 
                            py={6} 
                            mt={2} 
                            fontSize='lg' 
                            borderRadius='xl'
                            onClick={() => handleClose()}
                            variant='outline'      
                        >
                            Close
                        </Button>
                    }
                </Flex>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    );
}