import { useRef, useState } from "react";
import { Box, Card, CardBody, Flex, IconButton, Text } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard"
import { DeleteCardConfirmationModal } from "../modals/DeleteCardConfirmationModal";
import { FlashCardContextMenu } from "./FlashCardContextMenu";
import { useIsMobile } from "../../hooks/general/useIsMobile";
import { FlashCardDetailsBottomSheet } from "../bottomSheets/FlashCardDetailsBottomSheet";
import { IconDotsVertical } from "@tabler/icons-react";

interface FlasCardListElementProps {
    flashCard: FlashCard;
    foreignLanguageName: string;
    onEdit: (current: FlashCard) => void;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard, foreignLanguageName, onEdit }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
    const [isDetailsOpen, setDetailsOpen] = useState<boolean>(false);

    const handleEdit = () => onEdit(flashCard);

    const handleDeleteConfirmationOpen = () => setDeleteConfirmationOpen(true);

    function handleDeleteConfirmationClose() {
        setDeleteConfirmationOpen(false);
        setDetailsOpen(false);
    }

    const isMobile = useIsMobile();

    function renderDeleteConfirmation(){
        return <DeleteCardConfirmationModal isOpen={isDeleteConfirmationOpen} onClose={handleDeleteConfirmationClose} flashCard={flashCard} foreignLanguageName={foreignLanguageName}/>;
    }

    function renderFlashCardOptionsButton() {
        if(isMobile){
            return <IconButton icon={<IconDotsVertical />} variant='ghost' onClick={() => setDetailsOpen(true)} aria-label="options" />
        }
        else{
            return <FlashCardContextMenu onEdit={handleEdit} onDelete={handleDeleteConfirmationOpen} />;
        }
    }

    return (
        <>
        <Flex flexDirection='row' align='center' justifyContent='space-between' w='100%' my={2} ref={elementRef} className="slider">
            <Card variant='elevated' shadow='md' flex={1}>
                <CardBody display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Box>
                        <Text userSelect='text' color='blue.200'>{flashCard.foreignWord}</Text>
                        <Text userSelect='text'>{flashCard.translatedWord}</Text>
                    </Box>
                    {renderFlashCardOptionsButton()}
                </CardBody>
            </Card>
        </Flex>
        {renderDeleteConfirmation()}
        <FlashCardDetailsBottomSheet isOpen={isDetailsOpen} onClose={() => setDetailsOpen(false)} flashCard={flashCard} onEdit={handleEdit} onDelete={handleDeleteConfirmationOpen}/>
        </>
    )
}