export interface FlashCard {
    id?: number;
    foreignWord: string;
    translatedWord: string;
    foreignExampleSentence: string | null;
    translatedExampleSentence: string | null;
}