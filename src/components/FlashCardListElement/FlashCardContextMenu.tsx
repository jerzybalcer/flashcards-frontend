import { Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";

interface FlashCardContextMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const FlashCardContextMenu: React.FC<FlashCardContextMenuProps> = ({ onEdit, onDelete }) => {
    return (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label='options'
            icon={<IconDotsVertical />}
            variant='ghost'
        />
        <MenuList>
            <MenuItem icon={<IconEdit />} onClick={() => onEdit()}>
                Edit
            </MenuItem>
            <MenuItem icon={<IconTrash />} onClick={() => onDelete()}>
                Delete
            </MenuItem>
        </MenuList>
    </Menu>
    );
}