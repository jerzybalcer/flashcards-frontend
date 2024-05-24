import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard"
import { IconEdit, IconTrash } from "@tabler/icons-react";
import './FlashCardListElement.css';
import { DeleteCardConfirmationModal } from "../modals/DeleteCardConfirmationModal";

interface FlasCardListElementProps {
    flashCard: FlashCard;
    onEdit: (current: FlashCard) => void;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard, onEdit }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [elementRef]);

    const handleOutsideClick = (event: MouseEvent) => {
        if(elementRef.current && !(elementRef.current.contains(event.target as Node))){
            elementRef.current.classList.remove('slide');
        }
    }

    const handleClick = (event: React.MouseEvent) => {
        event.currentTarget.classList.toggle('slide');
    }

    const handleEdit = () => onEdit(flashCard);

    return (
        <>
        <Flex flexDirection='row' align='center' justifyContent='space-between' w='100%' my={2} ref={elementRef} className="slider" onClick={handleClick}>
            <Card variant='elevated' shadow='md' flex={1}>
                <CardBody>
                    <Text userSelect='text'>{flashCard.foreignWord}</Text>
                    <Text userSelect='text'>{flashCard.translatedWord}</Text>
                </CardBody>
            </Card>

            <Flex h='100%' className="side-menu">
                <Button w={20} h='100%' display='flex' flexDirection='column' gap={4} mr={2} onClick={() => handleEdit()}>
                    <IconEdit />
                    <Text>Edit</Text>
                </Button>
                <Button w={20} h='100%' display='flex' flexDirection='column' gap={4} onClick={() => setDeleteConfirmationOpen(true)}>
                    <IconTrash />
                    <Text>Delete</Text>
                </Button>
            </Flex>
        </Flex>
        <DeleteCardConfirmationModal isOpen={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} flashCard={flashCard}/>
        </>
    )
}