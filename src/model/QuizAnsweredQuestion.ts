import { FlashCard } from "./FlashCard";

export interface QuizAnsweredQuestion {
    flashCard: FlashCard;
    answerCorrect: boolean;
    answerTimeMs: number;
}