import { Box, Card, Center, Text } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import './FlippableFlashCard.css'
import { useEffect } from 'react';

interface FlippableFlashCardProps {
    flashCard: FlashCard;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard })  => {

    useEffect(() => {
        document.querySelector('.flip-card')!.classList.remove("flipped");
    }, [flashCard]);

    return (
    <Box className="flip-card" onClick={() => document.querySelector('.flip-card')!.classList.add("flipped")}>
        <Box className="flip-card-inner">
            <Box className="flip-card-front">
                <Card w='100%' h='100%'>
                    <Center h='100%'>
                        <Text>{flashCard.foreignWord}</Text>
                    </Center>
                </Card>

            </Box>
            <Box className="flip-card-back">
                <Card w='100%' h='100%'>
                    <Center h='100%'>
                        <Text>{flashCard.translatedWord}</Text>
                    </Center>
                </Card>
            </Box>
        </Box>
    </Box>
    )
}
