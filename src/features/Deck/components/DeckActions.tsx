import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { IconSchool, IconCheckbox } from "@tabler/icons-react";

interface Props {
    onLearnClick: () => void;
    onQuizClick: () => void;
}

export const DeckActions: React.FC<Props> = ({ onLearnClick, onQuizClick }) =>
{

  return <Flex gap={2} mb={6}>
            <Button w='50%' flexGrow={1} py={12} onClick={onLearnClick} bg='gray.700' borderRadius='xl'>
                <Flex direction='column' justify='center' align='center' gap={4}>
                    <IconSchool size={32} color="var(--chakra-colors-blue-200)"/>
                    <Text fontSize='t1' fontWeight={600}>Learn</Text>
                </Flex>
            </Button>

            <Button w='50%' flexGrow={1} py={12} onClick={onQuizClick} bg='gray.700' borderRadius='xl'>
                <Flex direction='column' justify='center' align='center' gap={4}>
                    <IconCheckbox size={32} color="var(--chakra-colors-blue-200)"/>
                    <Text fontSize='t1' fontWeight={600}>Quiz</Text>
                </Flex>
            </Button>
        </Flex>;
}
  