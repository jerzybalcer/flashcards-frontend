import { Flex, Progress, Text } from "@chakra-ui/react";

interface ProgressBarProps{
    currentValue: number;
    maxValue: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, maxValue }) => {
    return (
    <Flex w='100%' gap={4} align='center'>
        <Progress value={currentValue} max={maxValue} flexGrow={1} borderRadius='md' />
        <Text opacity={0.8} fontSize='sm'>{currentValue} / {maxValue}</Text>
    </Flex>
    );
}