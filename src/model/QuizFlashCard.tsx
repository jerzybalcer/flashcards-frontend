export interface QuizFlashCard {
    id: number;
    foreignWord: string;
    translatedWord: string;
    wrongAnswers: string[];
}