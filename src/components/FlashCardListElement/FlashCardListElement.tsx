import { useRef, useState } from "react";
import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard"
import { DeleteCardConfirmationModal } from "../modals/DeleteCardConfirmationModal";
import { FlashCardContextMenu } from "./FlashCardContextMenu";
import { useIsMobile } from "../../hooks/general/useIsMobile";
import { DeleteCardBottomSheet } from "../bottomSheets/DeleteCardBottomSheet";

interface FlasCardListElementProps {
    flashCard: FlashCard;
    foreignLanguageName: string;
    onEdit: (current: FlashCard) => void;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard, foreignLanguageName, onEdit }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    const handleEdit = () => onEdit(flashCard);

    function handleDeleteConfirmationClose() {
        setDeleteConfirmationOpen(false);
    }

    const isMobile = useIsMobile();

    function renderDeleteConfirmation(){
        if(isMobile){
            return <DeleteCardBottomSheet isOpen={isDeleteConfirmationOpen} onClose={handleDeleteConfirmationClose} flashCard={flashCard} foreignLanguageName={foreignLanguageName}/>;
        }
        else{
            return <DeleteCardConfirmationModal isOpen={isDeleteConfirmationOpen} onClose={handleDeleteConfirmationClose} flashCard={flashCard} foreignLanguageName={foreignLanguageName}/>
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
                    <FlashCardContextMenu onEdit={handleEdit} onDelete={() => setDeleteConfirmationOpen(true)} />
                </CardBody>
            </Card>
        </Flex>
        {renderDeleteConfirmation()}
        </>
    )
}