import { Button } from "@chakra-ui/react"

interface Props {
    text: string;
    icon?: JSX.Element;
    onClick: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({text, icon, onClick, isLoading, isDisabled}) => {
    return (
        <Button 
            w='100%' py={6}
            fontSize='lg' 
            borderRadius='xl' 
            colorScheme='blue'
            onClick={() => onClick()} 
            isLoading={isLoading}
            isDisabled={isDisabled}
            leftIcon={icon}
        >
            {text}
        </Button>
    )
}