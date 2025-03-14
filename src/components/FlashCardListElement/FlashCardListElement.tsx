import { useRef, useState } from "react";
import { Box, Card, CardBody, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard"
import { DeleteCardConfirmationModal } from "../modals/DeleteCardConfirmationModal";
import { FlashCardContextMenu } from "./FlashCardContextMenu";
import { FlashCardOptionsBottomSheet } from "./FlashCardOptionsBottomSheet";

interface FlasCardListElementProps {
    flashCard: FlashCard;
    onEdit: (current: FlashCard) => void;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard, onEdit }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    const [isMobile] = useMediaQuery('(min-width: 1024px)')

    const handleEdit = () => onEdit(flashCard);

    return (
        <>
        <Flex flexDirection='row' align='center' justifyContent='space-between' w='100%' my={2} ref={elementRef} className="slider">
            <Card variant='elevated' shadow='md' flex={1}>
                <CardBody display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Box>
                        <Text userSelect='text' color='blue.200'>{flashCard.foreignWord}</Text>
                        <Text userSelect='text'>{flashCard.translatedWord}</Text>
                    </Box>
                    {isMobile 
                    ? <FlashCardContextMenu onEdit={handleEdit} onDelete={() => setDeleteConfirmationOpen(true)} />
                    : <FlashCardOptionsBottomSheet flashcard={flashCard} />
                    }
                </CardBody>
            </Card>
        </Flex>
        <DeleteCardConfirmationModal isOpen={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} flashCard={flashCard}/>
        </>
    )
}