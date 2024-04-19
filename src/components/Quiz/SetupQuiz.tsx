import { Button, Flex, FormControl, FormLabel, Heading, Select } from "@chakra-ui/react"

interface SetupQuizProps {
    onStartQuiz: () => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ onStartQuiz }) => {
    return  <Flex direction='column' justifyContent='center' align='start' px={4} gap={16} flexGrow={1}>
        <Heading alignSelf='center'>Start new quiz</Heading>
        <Flex direction="column" w='75%' gap={2} alignSelf='center'>
            <FormControl isRequired>
                <FormLabel>Deck</FormLabel>
                <Select placeholder="">
                    <option>Italiano</option>
                </Select>
            </FormControl>
        </Flex>
        <Button size='lg' mx='auto' colorScheme="teal" onClick={() => onStartQuiz()}>Start Quiz</Button>
    </Flex>
}