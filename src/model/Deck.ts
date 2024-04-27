import { FlashCard } from "./FlashCard";
import { Language } from "./Language";

export interface Deck {
    id?: number;
    name: string;
    language: Language;
    cards: FlashCard[];
}