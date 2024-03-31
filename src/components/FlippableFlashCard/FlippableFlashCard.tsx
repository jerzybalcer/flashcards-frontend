import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Card, Center, Text } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import './FlippableFlashCard.css'

interface FlippableFlashCardProps {
    flashCard: FlashCard;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard })  => {
    const textMargin = 8;
    const maxFontSize = 150;
    
    const [fontSize, setFontSize] = useState<number>(maxFontSize);

    const textRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        document.querySelector('.flip-card')!.classList.remove("flipped");
        setFontSize(maxFontSize);
    }, [flashCard]);

    useLayoutEffect(() => {
        scaleDownText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize]);

    const handleFlip = () => {
        document.querySelector('.flip-card')!.classList.add("flipped")
    };

    const scaleDownText = () => {
        if(!textRef.current || !cardRef.current) return;
        
        if((textRef.current.scrollWidth > cardRef.current.scrollWidth - textMargin) || 
            (textRef.current.scrollHeight > cardRef.current.scrollHeight - textMargin)){
            setFontSize(fontSize - 4);
            return;
        }
    };

    return (
    <Box className="flip-card" onClick={() => handleFlip()}>
        <Box className="flip-card-inner">
            <Box className="flip-card-front">
                <Card w='100%' h='100%' ref={cardRef}>
                    <Center h='100%'>
                        <Text ref={textRef} fontSize={fontSize}>{flashCard.foreignWord}</Text>
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
