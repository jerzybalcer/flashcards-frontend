import { Card, CardBody, Text } from "@chakra-ui/react"
import { FlashCard } from "../model/FlashCard"

interface FlasCardListElementProps {
    flashCard: FlashCard;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard }) => {
    return (
        <Card variant='elevated' shadow='md' my={2}>
            <CardBody>
                <Text userSelect='text'>{flashCard.foreignWord}</Text>
                <Text userSelect='text'>{flashCard.translatedWord}</Text>
            </CardBody>
        </Card>
    )
}