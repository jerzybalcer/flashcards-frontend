import { BottomSheet } from "./BottomSheet";
import { Text } from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onSort: () => void;
    onClose: () => void;
}

export const SortBottomSheet: React.FC<Props> = ({ isOpen, onSort, onClose }) => {
    return (
        <BottomSheet isOpen={isOpen}
            header={[<Text>Sort</Text>]}
            body={[<></>]}
            confirmText="Apply"
            onConfirm={() => onSort()}
            onClose={onClose}
        />
    );
}