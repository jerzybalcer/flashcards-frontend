import { useEffect, useRef, useState } from 'react';
import { Box, Card, Center, Flex } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import { FittedText } from '../FittedText';
import { ReadAloudButton } from '../ReadAloudButton';
import './FlippableFlashCard.css'
import { useLocalStorage } from 'usehooks-ts';


interface FlippableFlashCardProps {
    flashCard: FlashCard;
    language: string;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard, language })  => {
    const flipCardRef = useRef<HTMLDivElement>(null);
    const foreignSideRef = useRef<HTMLDivElement>(null);
    const translatedSideRef = useRef<HTMLDivElement>(null);
    const [currentSide, setCurrentSide] = useState<string>(flashCard.foreignWord);
    const [settings] = useLocalStorage('learnSettings', { defaultSide: 'foreign', autoRead: false });


    const getInitialSide = () => {
        return settings.defaultSide === 'foreign' ? flashCard.foreignWord : flashCard.translatedWord;
    }

    const isCurrentSide = (side: string) => currentSide === side;

    const flip = (newSide: string, withAnimation: boolean = true) => {
        flipCardRef.current!.style.transition = withAnimation ? 'transform 0.6s' : 'transform 0s';

        if(newSide === flashCard.foreignWord) {
            flipCardRef.current!.style.transform = 'rotateY(0deg)';
        }
        else {
            flipCardRef.current!.style.transform = 'rotateY(180deg)';
        }

        setCurrentSide(newSide);
    }

    const handleClick = () => {
        if(currentSide === flashCard.foreignWord)
        {
            flip(flashCard.translatedWord);
        }else
        {
            flip(flashCard.foreignWord);
        }
    };

    useEffect(() => {
        flip(getInitialSide(), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flashCard, settings]);

    return (
    <Box w='100%' h='100%' className="flip-card">
        <Card ref={flipCardRef} className="flip-card-inner" onClick={() => handleClick()}>
            <Flex className="flip-card-front" direction='column'>
                <Box alignSelf='end' h='10%' p='5%'>
                    <ReadAloudButton word={flashCard.foreignWord} language={language} autoRead={settings.autoRead && isCurrentSide(flashCard.foreignWord)}/>
                </Box>

                <Box w='100%' h='90%' ref={foreignSideRef} p={4}>
                    <Center h='100%'>
                        <FittedText padding={8} content={flashCard.foreignWord} containerRef={foreignSideRef}/>
                    </Center>
                </Box>
            </Flex>

            <Flex className="flip-card-back" direction='column'>
                <Box alignSelf='end' h='10%' p='5%'>
                    <ReadAloudButton word={flashCard.translatedWord} language='pl' autoRead={settings.autoRead && isCurrentSide(flashCard.translatedWord)}/>
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
