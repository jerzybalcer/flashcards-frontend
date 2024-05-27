import { useEffect, useState } from "react";
import { shuffle } from "../../utils/shuffle";
import { RadioCardGroup } from "../RadioCardGroup";

interface AnswerGroupProps {
    correctAnswer: string;
    allAnswers: string[];
    onAnswerChosen: (answer: string) => void;
}

export const AnswerGroup: React.FC<AnswerGroupProps> = ({ correctAnswer, allAnswers, onAnswerChosen }) => {
    const [answers, setAnswers] = useState<string[]>([]);

    const getPossibleAnswers = (): string[] => {
        const incorrectAnswers: string[] = [];

        for(let i = 0; i < 3; i++){
            const randomAnswer = getRandomAnswer([correctAnswer, ...incorrectAnswers]);
            incorrectAnswers.push(randomAnswer);
        }

        const possibleAnswers = [correctAnswer, ...incorrectAnswers];

        return shuffle(possibleAnswers) as string[];
    };

    const getRandomAnswer = (except: string[]): string => {
        const possibleAnswers = allAnswers.filter(a => !except.includes(a));
        const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
        return possibleAnswers[randomIndex];
    };

    const handleAnswerClick = (answer: string) => {
        onAnswerChosen(answer);
    };

    useEffect(() => {
        setAnswers(getPossibleAnswers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctAnswer]);

    
    return <RadioCardGroup options={answers} onChange={(value) => handleAnswerClick(value)} />;
};