import { Flex, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
    isPreviousEnabled: boolean;
    onPreviousClick: () => void;
    isNextEnabled: boolean;
    onNextClick: () => void;
}

export const LearnNavigation: React.FC<Props> = ({isPreviousEnabled, onPreviousClick, isNextEnabled, onNextClick }) => {
  return <Flex w='100%' gap={2} align='center'>
            <Button w='30%' py={6} fontSize='md' colorScheme="blue" borderRadius='xl' variant='ghost' isDisabled={!isPreviousEnabled} onClick={() => onPreviousClick()}>Previous</Button>
            <Button w='70%' py={6} fontSize='lg' colorScheme="blue" borderRadius='xl' onClick={() => onNextClick()}>{isNextEnabled ? 'Continue' : 'Go back to deck'}</Button>
        </Flex>;
}
  