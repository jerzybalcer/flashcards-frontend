import { LearnSettingsForm } from "../LearnSettingsForm";
import { BottomSheet } from "./BottomSheet";
import { Text } from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const LearnSettingsBottomSheet: React.FC<Props> = ({isOpen, onClose}) => {
    function getHeader() {
        return <Text fontWeight='bold'>Settings</Text>;
    }

    function getBody() {
        return <LearnSettingsForm />
    }

    function handleConfirm(){
        onClose();
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Close" onConfirm={handleConfirm} onClose={onClose} closeButtonVisible={false}/>
}