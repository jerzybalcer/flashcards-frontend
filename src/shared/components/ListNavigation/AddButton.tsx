import { IconButton } from "@chakra-ui/react"
import { IconPlus } from "@tabler/icons-react"

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return <IconButton colorScheme="blue" borderRadius='xl' size='lg' aria-label="add" onClick={() => onClick()} icon={<IconPlus />} />
}