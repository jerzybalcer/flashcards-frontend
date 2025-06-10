import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { AddDeckBottomSheet } from "./AddDeckBottomSheet";
import { AddDeckDialog } from "./AddDeckDialog";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const isMobile = useIsMobile();

    if(isMobile){
        return <AddDeckBottomSheet isOpen={isOpen} onClose={onClose} />

    }else {
        return <AddDeckDialog isOpen={isOpen} onClose={onClose} />;
    }
}