import { Card, CardBody, Text } from "@chakra-ui/react"
import { FlashCard } from "../model/FlashCard"

interface FlasCardListElementProps {
    flashCard: FlashCard;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard }) => {
    return (
        <Card mx={4} my={2} variant='elevated' shadow='md'>
            <CardBody>
                <Text userSelect='text'>{flashCard.foreignWord}</Text>
                <Text userSelect='text'>{flashCard.translatedWord}</Text>
            </CardBody>
        </Card>
    )
}