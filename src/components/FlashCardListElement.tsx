import { Card, CardBody, Text } from "@chakra-ui/react"
import { FlashCard } from "../model/FlashCard"

interface FlasCardListElementProps {
    flashCard: FlashCard;
}

export const FlashCardListElement: React.FC<FlasCardListElementProps> = ({ flashCard }) => {
    return (
        <Card margin='16px' variant='elevated' shadow='md'>
            <CardBody>
                <Text>{flashCard.foreignWord}</Text>
                <Text>{flashCard.translatedWord}</Text>
            </CardBody>
        </Card>
    )
}