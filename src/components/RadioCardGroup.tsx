import { Flex, Text, useRadioGroup } from "@chakra-ui/react";
import { RadioCard } from "./RadioCard";
import { useEffect } from "react";

interface RadioCardGroupProps {
    options: string[];
    defaultValue?: string;
    isDisabled?: boolean;
    onChange: (value: string) => void;
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({ options, onChange, defaultValue, isDisabled = false }) => {
    const { getRootProps, getRadioProps, setValue } = useRadioGroup({
        name: 'possibleAnswers',
        onChange: onChange,
    })

    const radioGroup = getRootProps();

    useEffect(() => {
        setValue(defaultValue ?? '');
    }, [options]);
    
    return (
        <Flex {...radioGroup} direction='column' gap={2} w='100%'>
        {options.map((option) => {
            const radio = getRadioProps({ value: option })
            return (
            <RadioCard key={option} {...radio} isDisabled={isDisabled && option !== defaultValue}>
                <Text overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>{option}</Text>
            </RadioCard>
            )
        })}
        </Flex>
    )
}