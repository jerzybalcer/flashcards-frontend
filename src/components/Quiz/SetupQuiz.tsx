import { Box, Button, Flex, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select } from "@chakra-ui/react"

interface SetupQuizProps {
    onStartQuiz: () => void;
}

export const SetupQuiz: React.FC<SetupQuizProps> = ({ onStartQuiz }) => {
    return  <Flex direction='column' justifyContent='space-between' h='100%'>
        <Heading>Quiz settings</Heading>
        <Flex direction="column" w='100%' justify='space-between' alignSelf='center' flexGrow={1}>
            <FormControl isRequired display='flex' justifyContent='center' flexDir='column' gap={16} flexGrow={1}>
                <Box>
                    <FormLabel>Deck</FormLabel>
                    <Select placeholder="">
                        <option>Italiano</option>
                    </Select>
                </Box>
                <Box>
                    <FormLabel>Number of cards</FormLabel>
                    <NumberInput defaultValue={20} min={10} max={50}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </Box>
                <Box>
                    <FormLabel>Mode</FormLabel>
                    <RadioGroup defaultValue='singleChoice'>
                        <Flex justify='space-between'>
                            <Radio value='singleChoice'>Single-choice</Radio>
                            <Radio value='openText'>Open-text</Radio>
                            <Radio value='trueOrFalse'>True/false</Radio>
                        </Flex>
                    </RadioGroup>
                </Box>
            </FormControl>
        </Flex>
        <Button size='lg' alignSelf='center' colorScheme="teal" onClick={() => onStartQuiz()}>Start Quiz</Button>
    </Flex>
}