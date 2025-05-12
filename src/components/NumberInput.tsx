import { Flex, IconButton, Text } from "@chakra-ui/react"
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
    defaultValue: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export const NumberInput: React.FC<Props> = ({ defaultValue, min, max, onChange }) => {
    const [value, setValue] = useState<number>(defaultValue);

    const isOutOfRange = defaultValue < min || defaultValue > max;

    const canIncrement = value < max;
    const canDecrement = value > min;

    function handleIncrement(){
        if(canIncrement) {
            const newValue = value + 1;
            setValue(newValue);
            onChange(newValue);
        }
    }

    function handleDecrement(){
        if(canDecrement) {
            const newValue = value - 1;
            setValue(newValue);
            onChange(newValue);
        }
    }

    return (
        <Flex w='100px' gap={4} justify='space-between' align='center'>
            <IconButton borderRadius='lg' variant='outline' icon={<IconMinus />} aria-label="decrement" onClick={() => handleDecrement()} isDisabled={!canDecrement || isOutOfRange}/>
            <Text fontSize='lg'>{value}</Text> 
            <IconButton borderRadius='lg' variant='outline' icon={<IconPlus />} aria-label="increment" onClick={() => handleIncrement()} isDisabled={!canIncrement || isOutOfRange}/>
        </Flex>
    )
}