import { Heading, Flex, Button, Text, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface Props {
    deckId: number;
}

export const TooFewCards: React.FC<Props> = ({ deckId }) => {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(`/decks/${deckId}`);
    }

    return (
        <Flex direction='column' justifyContent='space-between' h='100%'>
            <Box></Box>
            <Box>
                <Heading>Too few flashcards</Heading>
                <Text fontSize='xl'>Add at least 10 to start quizzing</Text>
            </Box>
            <Button py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => handleGoBack()}>Go back to deck</Button>
        </Flex>
    )
}