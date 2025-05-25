export interface QuizFlashCard {
    id: number;
    foreignWord: string;
    translatedWord: string;
    wrongAnswers: string[];
    foreignExampleSentence: string | null;
    translatedExampleSentence: string | null;
}