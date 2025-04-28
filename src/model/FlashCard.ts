export interface FlashCard {
    id?: number;
    foreignWord: string;
    translatedWord: string;
    exampleSentence: string | null;
}