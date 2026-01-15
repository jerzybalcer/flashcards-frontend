import { RadioCardGroup } from "@/shared/components/RadioCardGroup";


interface AnswerGroupProps {
    answers: string[];
    onAnswerChosen: (answer: string) => void;
}

export const AnswerGroup: React.FC<AnswerGroupProps> = ({ answers, onAnswerChosen }) => {
    const handleAnswerClick = (answer: string) => {
        onAnswerChosen(answer);
    }

    return <RadioCardGroup options={answers} onChange={(value) => handleAnswerClick(value)} />;
};