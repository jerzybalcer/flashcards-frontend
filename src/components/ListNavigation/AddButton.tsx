import { Button } from "@chakra-ui/react"
import { IconPlus } from "@tabler/icons-react"

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return <Button onClick={() => onClick()}>
        <IconPlus />
    </Button>
}