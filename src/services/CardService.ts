import { AxiosError } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "../model/FlashCard";
import { QuizResultFlashCard } from "../model/QuizResultFlashCard";
import humps from 'humps';

export const getCards = async () =>
    apiClient
        .get(`/cards`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));

export const addCard = async (card: FlashCard) =>
    apiClient
        .post(`/card`, 
            {foreign_word: card.foreignWord, translated_word: card.translatedWord}, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

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

export const addCardsFromFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient
        .post(`/card/file`, formData)
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));
}

export const getQuizCards = async () =>
    apiClient
        .get(`/cards/quiz`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));


export const updateQuizCards = async (resultCards: QuizResultFlashCard[]) =>
    apiClient
        .post(`/cards/quiz`, humps.decamelizeKeys(resultCards), { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));
