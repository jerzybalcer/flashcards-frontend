import { Card, CardBody, Radio, useRadio } from "@chakra-ui/react"
import { useRef } from "react";

export const Answer = ({ ...props }) => {
    const { getInputProps, getRadioProps, state } = useRadio(props);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
    <Card as='label' variant='outline' bg={state.isChecked ? 'blue.900' : 'transparent'} borderRadius='xl' >
        <input {...getInputProps()} ref={inputRef}/>
        <CardBody {...getRadioProps()} cursor='pointer' display='flex' gap={2}>
        <Radio size='lg' isChecked={state.isChecked} onClick={() => inputRef.current!.click()}/>
        {props.children}
        </CardBody>
    </Card>
    )
}