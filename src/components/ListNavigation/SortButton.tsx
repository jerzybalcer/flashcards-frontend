import { IconButton } from "@chakra-ui/react"
import { IconSortDescending } from "@tabler/icons-react"

export const SortButton = () => {
    return <IconButton borderRadius='xl' size='lg' aria-label="sort" variant='outline' icon={<IconSortDescending/>} />;
}