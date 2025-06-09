import { Stat, StatLabel, StatNumber, StatHelpText, Box } from "@chakra-ui/react";

interface QuizResultStatProps {
    label: string;
    value: string;
    details: string;
}

export const QuizResultStat: React.FC<QuizResultStatProps> = ({ label, value, details }) => {
    return <Box>
        <Stat border='1px solid gray' borderRadius='md' p={2}>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
            <StatHelpText>{details}</StatHelpText>
        </Stat>
    </Box>
};