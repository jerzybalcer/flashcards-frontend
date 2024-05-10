import { useEffect, useRef, useState } from 'react';
import { Box, Card, Center, Flex } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import { FittedText } from '../FittedText';
import { ReadAloudButton } from '../ReadAloudButton';
import './FlippableFlashCard.css'

interface FlippableFlashCardProps {
    flashCard: FlashCard;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard })  => {
    const flipCardRef = useRef<HTMLDivElement>(null);
    const foreignSideRef = useRef<HTMLDivElement>(null);
    const translatedSideRef = useRef<HTMLDivElement>(null);
    const [currentSide, setCurrentSide] = useState<string>(flashCard.foreignWord);

    useEffect(() => {
        setCurrentSide(flashCard.foreignWord);
        flipCardRef.current!.style.transition = 'transform 0s';
        flipCardRef.current!.style.transform = 'rotateY(0deg)';
    }, [flashCard]);

    const handleFlip = () => {
        if(currentSide === flashCard.foreignWord)
        {
            flipCardRef.current!.style.transition = 'transform 0.6s';
            flipCardRef.current!.style.transform = 'rotateY(180deg)';
            setCurrentSide(flashCard.translatedWord);
        }else
        {
            flipCardRef.current!.style.transition = 'transform 0.6s';
            flipCardRef.current!.style.transform = 'rotateY(0deg)';
            setCurrentSide(flashCard.foreignWord);
        }
    };

    return (
    <Box w='100%' h='100%' className="flip-card">
        <Card ref={flipCardRef} className="flip-card-inner" onClick={() => handleFlip()}>
            <Flex className="flip-card-front" direction='column'>
                <Box alignSelf='end' h='10%' p='5%'>
                    <ReadAloudButton word={currentSide} language='it' />
                </Box>

                <Box w='100%' h='90%' ref={foreignSideRef} p={4}>
                    <Center h='100%'>
                        <FittedText padding={8} content={flashCard.foreignWord} containerRef={foreignSideRef}/>
                    </Center>
                </Box>
            </Flex>

            <Flex className="flip-card-back" direction='column'>
                <Box alignSelf='end' h='10%' p='5%'>
                    <ReadAloudButton word={currentSide} language='pl' />
                </Box>

                <Box w='100%' h='90%' ref={translatedSideRef} p={4}>
                    <Center h='100%'>
                        <FittedText padding={8} content={flashCard.translatedWord} containerRef={translatedSideRef}/>
                    </Center>
                </Box>
            </Flex>
        </Card>
    </Box>
    )
}
