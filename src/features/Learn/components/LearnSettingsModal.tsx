import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { LearnSettingsBottomSheet } from "./LearnSettingsBottomSheet";
import { LearnSettingsDialog } from "./LearnSettingsDialog";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const LearnSettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const isMobile = useIsMobile();

    if(isMobile){
        return <LearnSettingsBottomSheet isOpen={isOpen} onClose={onClose} />
    }
    else{
        return <LearnSettingsDialog isOpen={isOpen} onClose={onClose} />;
    }
}