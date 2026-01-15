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
            <Button flexGrow={1} py={12} onClick={onLearnClick}>
                <Flex direction='column' justify='center' align='center' gap={4}>
                    <IconSchool size={32} />
                    <Text>Learn</Text>
                </Flex>
            </Button>

            <Button flexGrow={1} py={12} onClick={onQuizClick}>
                <Flex direction='column' justify='center' align='center' gap={4}>
                    <IconCheckbox size={32} />
                    <Text>Quiz</Text>
                </Flex>
            </Button>
        </Flex>;
}
  