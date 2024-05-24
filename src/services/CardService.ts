import { AxiosError } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "../model/FlashCard";

export const editCard = async (card: FlashCard) =>
    apiClient
        .put(`/card/${card.id}`, 
            {foreign_word: card.foreignWord, translated_word: card.translatedWord, id: card.id}, 
            { headers: {'Content-Type': 'application/json'} })
        .catch((err: AxiosError) => Promise.reject(err));

export const deleteCard = async (id: number) =>
    apiClient
        .delete(`/card/${id}`)
        .catch((err: AxiosError) => Promise.reject(err));