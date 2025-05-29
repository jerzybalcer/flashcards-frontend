import { QuizMode } from "./QuizMode";

export interface QuizCardLog {
    cardId: number;
    timestamp: Date;
    answerCorrect: boolean;
    responseTime: number;
    quizMode: QuizMode;
}