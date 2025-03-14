import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, IconButton } from "@chakra-ui/react";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { FlashCardInputForm } from "../FlashCardInputForm";
import { FlashCard } from "../../model/FlashCard";

interface FlashCardOptionsBottomSheetProps {
    flashcard: FlashCard;
    onDelete: () => void;
    onEdit: (flashcard: FlashCard) => void;
}

export const FlashCardOptionsBottomSheet: React.FC<FlashCardOptionsBottomSheetProps> = ({ flashcard, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
    <>
        <IconButton variant='ghost' icon={<IconDotsVertical />} aria-label="options" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} placement='bottom' onClose={() => setIsOpen(false)}>
                <DrawerOverlay />
                <DrawerContent borderTopRadius='md'>
                    <DrawerHeader display='flex' justifyContent='space-between' alignItems='center' gap={2}>
                        Flashcard details
                    </DrawerHeader>

                    <DrawerBody>
                        <FlashCardInputForm 
                            foreignWordOnChange={() => onEdit(flashcard)} 
                            translatednWordOnChange={() => onEdit(flashcard)}
                            translatednWordDefaultValue={flashcard.translatedWord}
                            foreignDefaultValue={flashcard.foreignWord} />
                    </DrawerBody>

                    <DrawerFooter w='100%' mt={4} display='flex' gap={2}>
                        <IconButton aria-label="delete" icon={<IconTrash />} variant='outline' py={6} px={4} fontSize='lg' borderRadius='xl' onClick={() => setIsOpen(false)}></IconButton>
                        <Button variant='solid' flexGrow={1} py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => setIsOpen(false)}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
    </>
    );
}