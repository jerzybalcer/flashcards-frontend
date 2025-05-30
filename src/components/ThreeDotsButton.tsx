import { IconButton } from "@chakra-ui/react"
import { IconDotsVertical } from "@tabler/icons-react"

interface Props {
    onClick: () => void;
    ariaLabel?: string;
}

export const ThreeDotsButton: React.FC<Props> = ({ onClick, ariaLabel = 'Settings' }) => {
    return <IconButton variant='ghost' aria-label={ariaLabel} icon={<IconDotsVertical />} onClick={onClick}/>
}