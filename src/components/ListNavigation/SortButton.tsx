import { IconButton } from "@chakra-ui/react"
import { IconSortDescending } from "@tabler/icons-react"

interface Props {
    onClick: () => void;
}

export const SortButton: React.FC<Props> = ({ onClick }) => {
    return <IconButton borderRadius='xl' size='lg' aria-label="sort" variant='outline' icon={<IconSortDescending/>} onClick={() => onClick()}/>;
}