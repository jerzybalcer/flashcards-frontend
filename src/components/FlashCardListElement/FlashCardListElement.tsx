import { useEffect, useRef } from "react";
import { Box, Button, Card, CardBody, Flex, Text, useToast } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard"
import './FlashCardListElement.css';
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deleteCard } from "../../services/CardService";

interface FlasCardListElementProps {
    flashCard: FlashCard;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const toast = useToast();

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

    const handleDelete = () => {
        deleteCard(flashCard.id ?? NaN)
            .then(() => {
                toast({
                    title: 'Card deleted',
                    description: `Deleted: ${flashCard.foreignWord} - ${flashCard.translatedWord}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });
            })
    }

    return (
        <Flex flexDirection='row' align='center' justifyContent='space-between' w='100%' my={2} ref={elementRef} className="slider" onClick={handleClick}>
            <Card variant='elevated' shadow='md' flex={1}>
                <CardBody>
                    <Text userSelect='text'>{flashCard.foreignWord}</Text>
                    <Text userSelect='text'>{flashCard.translatedWord}</Text>
                </CardBody>
            </Card>

            <Flex h='100%' className="side-menu">
                <Button w={20} h='100%' display='flex' flexDirection='column' gap={4} mr={2}>
                    <IconEdit />
                    <Text>Edit</Text>
                </Button>
                <Button w={20} h='100%' display='flex' flexDirection='column' gap={4}>
                    <IconTrash onClick={() => handleDelete()}/>
                    <Text>Delete</Text>
                </Button>
            </Flex>
        </Flex>
    )
}