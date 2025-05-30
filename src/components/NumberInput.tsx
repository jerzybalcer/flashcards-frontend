import { IconButton, HStack, Input, useNumberInput } from "@chakra-ui/react"
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

    function handleValueChange(newValue: number){
        if(isNaN(newValue)) newValue = 0;

        setValue(newValue);
        onChange(newValue);
    }

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: defaultValue,
            value: value,
            onChange(_, valueAsNumber) {
                handleValueChange(valueAsNumber);
            },
            keepWithinRange: true,
            min: min,
            max: max
        })

    const incrementProps = getIncrementButtonProps()
    const decrementProps = getDecrementButtonProps()
    const inputProps = getInputProps()

    return (
        <HStack maxW='320px'>
            <IconButton {...decrementProps} borderRadius='xl' size='lg' variant='outline' icon={<IconMinus />} aria-label="decrement"/>
            <Input {...inputProps} size='lg' borderRadius='lg' />
            <IconButton {...incrementProps} borderRadius='xl' size='lg' variant='outline' icon={<IconPlus />} aria-label="increment"/>
        </HStack>
    )
}