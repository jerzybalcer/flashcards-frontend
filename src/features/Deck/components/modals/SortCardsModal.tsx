import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { SortCardsBottomSheet } from "../bottomSheets/SortCardsBottomSheet";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const SortCardsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const isMobile = useIsMobile();

    if(isMobile){
        return <SortCardsBottomSheet isOpen={isOpen} onClose={onClose}/>;
    }
    else{
        // TODO: Change this to context menu
        return <SortCardsBottomSheet isOpen={isOpen} onClose={onClose}/>;
    }
}