import { AxiosError } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "@/model/FlashCard";


export const editCard = async (card: FlashCard) =>
    apiClient
        .put(`/cards/${card.id}`, 
            {foreign_word: card.foreignWord, translated_word: card.translatedWord, id: card.id, foreign_example_sentence: card.foreignExampleSentence, translated_example_sentence: card.translatedExampleSentence}, 
            { headers: {'Content-Type': 'application/json'} })
        .catch((err: AxiosError) => Promise.reject(err));

export const deleteCard = async (id: number) =>
    apiClient
        .delete(`/cards/${id}`)
        .catch((err: AxiosError) => Promise.reject(err));