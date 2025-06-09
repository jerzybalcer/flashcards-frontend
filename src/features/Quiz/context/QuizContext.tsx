import React, { useState } from "react";
import { QuizAnsweredQuestion } from "../../model/QuizAnsweredQuestion";

interface QuizContextType {
    numberOfCards: number;
    setNumberOfCards: (numberOfCards: number) => void;
    answeredQuestions: QuizAnsweredQuestion[];
    setAnsweredQuestions: (answeredQuestions: QuizAnsweredQuestion[]) => void;
}

export const QuizContext = React.createContext<QuizContextType | null>(null);


interface QuizContextProviderProps {
    children: React.ReactNode;
}

export const QuizContextProvider: React.FC<QuizContextProviderProps> = ({ children }) => {
    const [numberOfCards, setNumberOfCards] = useState<number>(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<QuizAnsweredQuestion[]>([]);

    return <QuizContext.Provider value={{numberOfCards, setNumberOfCards, answeredQuestions, setAnsweredQuestions}}>
        {children}
    </QuizContext.Provider>;
}