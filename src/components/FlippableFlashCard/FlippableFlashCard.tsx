import { useEffect, useRef } from 'react';
import { Box, Card, Center } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import { FittedText } from '../FittedText';
import './FlippableFlashCard.css'

interface FlippableFlashCardProps {
    flashCard: FlashCard;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard })  => {
    const foreignSideRef = useRef<HTMLDivElement>(null);
    const translatedSideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.querySelector('.flip-card')!.classList.remove("flipped");
    }, [flashCard]);

    const handleFlip = () => {
        document.querySelector('.flip-card')!.classList.add("flipped")
    };

    return (
    <Box w='100%' h='100%' className="flip-card" onClick={() => handleFlip()}>
        <Box className="flip-card-inner">
            <Box className="flip-card-front">
                <Card w='100%' h='100%' ref={foreignSideRef} p={4}>
                    <Center h='100%'>
                        <FittedText padding={4} content={flashCard.foreignWord} containerRef={foreignSideRef}/>
                    </Center>
                </Card>

            </Box>
            <Box className="flip-card-back">
                <Card w='100%' h='100%' ref={translatedSideRef} p={4}>
                    <Center h='100%'>
                        <FittedText padding={4} content={flashCard.translatedWord} containerRef={translatedSideRef}/>
                    </Center>
                </Card>
            </Box>
        </Box>
    </Box>
    )
}
