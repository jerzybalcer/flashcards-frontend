import { FlashCard } from "./FlashCard";

export interface QuizAnsweredQuestion {
    flashCard: FlashCard;
    lastAnswerCorrect: boolean;
    answerTimeMs: number;
}