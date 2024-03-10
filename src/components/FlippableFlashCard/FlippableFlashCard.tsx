import { useState } from 'react';
import { Box, Card, CardBody, Text } from '@chakra-ui/react';
import { FlashCard } from '../../model/FlashCard'
import './FlashCard.css'

interface FlippableFlashCardProps {
    flashCard: FlashCard;
}

export const FlippableFlashCard: React.FC<FlippableFlashCardProps> = ({ flashCard })  => {

    // const [isUnveiled, setIsUnveiled] = useState<boolean>(false);

    return (
    <Box 
        className='flip-container' 
        margin='10%' 
        height='30%'
        onClick={() => document.querySelector('#flip-container')!.classList.toggle("flip")}
    >
        <Card
        className='flipper'
        bgColor='#c7efff'
        >
            <CardBody 
                display='flex' 
                alignItems='center' 
                justifyContent='center'
            >
                {/* {!isUnveiled 
                ?  */}
                (<Box className='originalSide'>
                    <Text fontSize='15vw'>{flashCard.foreignWord}</Text>
                </Box>) 
                {/* :  */}
                (<Box className='translatedSide'>
                    <Text fontSize='15vw'>{flashCard.translatedWord}</Text>
                </Box>)
                {/* } */}
            </CardBody>
        </Card>
    </Box>
    )
}
