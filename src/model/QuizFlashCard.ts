export interface QuizFlashCard {
    id: number;
    foreignWord: string;
    translatedWord: string;
    lastAnswerCorrect: boolean;
    answerTimeMs: number;
}